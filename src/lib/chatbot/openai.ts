import type { ChatMessage } from "./types";

const DEFAULT_BASE = "https://api.openai.com/v1";

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) throw new Error("OPENAI_API_KEY is missing");
  return key;
}

function getBaseUrl(): string {
  return (process.env.OPENAI_BASE_URL?.trim() || DEFAULT_BASE).replace(/\/$/, "");
}

export function isLlmConfigured(): boolean {
  if (process.env.CHATBOT_LLM_DISABLED === "true") return false;
  return Boolean(process.env.OPENAI_API_KEY?.trim());
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
