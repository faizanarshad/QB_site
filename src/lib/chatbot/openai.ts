import type { ChatMessage } from "./types";

const DEFAULT_BASE = "https://api.openai.com/v1";

function normalizeKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  const unquoted = trimmed.replace(/^["']|["']$/g, "").trim();
  return unquoted || undefined;
}

/**
 * OpenAI API key from server env. Checks common names so a typo like OPEN_AI_API_KEY still works.
 * Prefer OPENAI_API_KEY (matches OpenAI docs and .env.example).
 */
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

export async function completeChat(messages: ChatMessage[], temperature = 0.35): Promise<string> {
  const res = await fetch(`${getBaseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
      temperature,
      max_tokens: 900,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Chat request failed (${res.status}): ${errText.slice(0, 300)}`);
  }

  const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const text = json.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Assistant returned an empty response");
  return text;
}
