import type { LlmMessage } from "./types";

const DEFAULT_BASE = "https://api.openai.com/v1";

function normalizeKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  const unquoted = trimmed.replace(/^["']|["']$/g, "").trim();
  return unquoted || undefined;
}

export function getOpenAiApiKeyFromEnv(): string | undefined {
  const candidates = [
    process.env.OPENAI_API_KEY,
    process.env.OPEN_AI_API_KEY,
    process.env.OPENAI_KEY,
    process.env.OPEN_AI_KEY,
  ];
  for (const c of candidates) {
    const key = normalizeKey(c);
    if (key) return key;
  }
  return undefined;
}

function getApiKey(): string {
  const key = getOpenAiApiKeyFromEnv();
  if (!key) throw new Error("OPENAI_API_KEY is missing");
  return key;
}

function getBaseUrl(): string {
  return (process.env.OPENAI_BASE_URL?.trim() || DEFAULT_BASE).replace(/\/$/, "");
}

export function isLlmConfigured(): boolean {
  if (process.env.CHATBOT_LLM_DISABLED === "true") return false;
  const key = getOpenAiApiKeyFromEnv();
  if (!key) return false;
  if (key === "sk-..." || key.startsWith("your-") || key === "replace-me") return false;
  return key.length >= 8;
}

export async function createEmbeddings(inputs: string[]): Promise<number[][]> {
  if (inputs.length === 0) return [];
  const res = await fetch(`${getBaseUrl()}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small",
      input: inputs,
    }),
  });
  if (!res.ok) {
    throw new Error(`Embedding request failed (${res.status})`);
  }
  const json = (await res.json()) as { data?: Array<{ embedding?: number[] }> };
  return (json.data || []).map((d) => d.embedding || []);
}

/** Non-streaming completion — kept for compatibility. */
export async function completeChat(messages: LlmMessage[], temperature = 0.35): Promise<string> {
  const controller = new AbortController();
  const timeoutMs = Number(process.env.OPENAI_CHAT_TIMEOUT_MS || 15000);
  const timeout = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 15000);
  let res: Response;
  try {
    res = await fetch(`${getBaseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getApiKey()}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || "gpt-4o",
        temperature,
        max_tokens: Number(process.env.OPENAI_CHAT_MAX_TOKENS || 800),
        messages,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Chat request failed (${res.status}): ${errText.slice(0, 300)}`);
  }

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = json.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Assistant returned an empty response");
  return text;
}

export type StreamEvent =
  | { type: "token"; content: string }
  | { type: "done"; fullText: string }
  | { type: "error"; message: string };

/**
 * Streams a chat completion from OpenAI, calling `onEvent` for each SSE chunk.
 * Resolves with the full accumulated text when the stream ends.
 */
export async function streamChat(
  messages: LlmMessage[],
  onEvent: (event: StreamEvent) => void,
  temperature = 0.25
): Promise<string> {
  const timeoutMs = Number(process.env.OPENAI_CHAT_TIMEOUT_MS || 30000);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number.isFinite(timeoutMs) ? timeoutMs : 30000);

  let res: Response;
  try {
    res = await fetch(`${getBaseUrl()}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getApiKey()}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL?.trim() || "gpt-4o",
        temperature,
        max_tokens: Number(process.env.OPENAI_CHAT_MAX_TOKENS || 800),
        stream: true,
        messages,
      }),
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Chat stream request failed (${res.status}): ${errText.slice(0, 300)}`);
  }

  if (!res.body) throw new Error("No response body for stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const raw = trimmed.slice(5).trim();
        if (raw === "[DONE]") continue;

        try {
          const parsed = JSON.parse(raw) as {
            choices?: Array<{ delta?: { content?: string }; finish_reason?: string }>;
          };
          const token = parsed.choices?.[0]?.delta?.content ?? "";
          if (token) {
            fullText += token;
            onEvent({ type: "token", content: token });
          }
        } catch {
          // Malformed chunk — skip
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  onEvent({ type: "done", fullText });
  return fullText;
}
