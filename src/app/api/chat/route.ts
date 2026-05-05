import { NextRequest, NextResponse } from "next/server";
import { getChatbotSystemPrompt } from "@/lib/chatbotSystemPrompt";

const MAX_USER_MESSAGE_LEN = 4000;
const MAX_MESSAGES = 24;

function isLlmConfigured(): boolean {
  if (process.env.CHATBOT_LLM_DISABLED === "true") return false;
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

type ChatRole = "user" | "assistant";

type IncomingMessage = {
  role?: string;
  content?: unknown;
};

function sanitizeMessages(raw: unknown): { ok: true; messages: { role: ChatRole; content: string }[] } | { ok: false; error: string } {
  if (!Array.isArray(raw)) {
    return { ok: false, error: "messages must be an array" };
  }
  const sliced = raw.slice(-MAX_MESSAGES);
  const out: { role: ChatRole; content: string }[] = [];
  for (const item of sliced) {
    const m = item as IncomingMessage;
    if (m.role !== "user" && m.role !== "assistant") {
      return { ok: false, error: "invalid message role" };
    }
    if (typeof m.content !== "string") {
      return { ok: false, error: "invalid message content" };
    }
    const content = m.content.trim();
    if (!content) {
      return { ok: false, error: "empty message content" };
    }
    if (content.length > MAX_USER_MESSAGE_LEN) {
      return { ok: false, error: "message too long" };
    }
    out.push({ role: m.role, content });
  }
  if (out.length === 0) {
    return { ok: false, error: "no messages" };
  }
  if (out[out.length - 1].role !== "user") {
    return { ok: false, error: "last message must be from user" };
  }
  return { ok: true, messages: out };
}

export async function GET() {
  return NextResponse.json({ llm: isLlmConfigured() });
}

export async function POST(request: NextRequest) {
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: "LLM is not configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as { messages?: unknown };
  const parsed = sanitizeMessages(payload.messages);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY!.trim();
  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const baseUrl = (process.env.OPENAI_BASE_URL?.trim() || "https://api.openai.com/v1").replace(/\/$/, "");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.6,
        max_tokens: 900,
        messages: [{ role: "system", content: getChatbotSystemPrompt() }, ...parsed.messages],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Chat LLM error:", res.status, errText.slice(0, 500));
      return NextResponse.json({ error: "Assistant request failed" }, { status: 502 });
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "Empty assistant response" }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.error("Chat LLM fetch error:", message);
    return NextResponse.json({ error: "Assistant unavailable" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
