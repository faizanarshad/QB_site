import { NextRequest, NextResponse } from "next/server";
import { detectIntent } from "@/lib/chatbot/intent";
import { completeChat, isLlmConfigured } from "@/lib/chatbot/openai";
import { retrieveContext } from "@/lib/chatbot/rag";
import { getSessionState, pruneSessions, saveSessionState } from "@/lib/chatbot/sessionStore";
import { getChatbotSystemPrompt } from "@/lib/chatbot/systemPrompt";
import type { ChatIntent, SessionState } from "@/lib/chatbot/types";

/** Env and session state must be evaluated per-request (not statically cached). */
export const dynamic = "force-dynamic";

const MAX_TEXT = 4000;
const MAX_MEMORY = 5;
/** Default: remove sessions whose `updatedAt` is older than this (7 days). */
const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const PRUNE_INTERVAL_MS = 1000 * 60 * 15;
let lastPruneMs = 0;

/** When false, chat rows are never auto-deleted (keep full records). */
function isChatSessionPruneEnabled(): boolean {
  return process.env.CHAT_SESSION_PRUNE_ENABLED?.trim().toLowerCase() !== "false";
}

/** Age after which idle sessions are deleted when pruning is enabled (default 7 days). */
function getSessionPruneTtlMs(): number {
  const raw = process.env.CHAT_SESSION_TTL_HOURS?.trim();
  if (!raw) return DEFAULT_SESSION_TTL_MS;
  const hours = Number(raw);
  if (!Number.isFinite(hours) || hours <= 0) return DEFAULT_SESSION_TTL_MS;
  const ms = hours * 60 * 60 * 1000;
  const maxMs = 1000 * 60 * 60 * 24 * 365 * 10;
  return Math.min(ms, maxMs);
}

type ChatBody = {
  message?: unknown;
  session_id?: unknown;
};

function parseLeadDetails(text: string, session: Awaited<ReturnType<typeof getSessionState>>): void {
  const lower = text.toLowerCase();
  if (!session.leadDraft.project_type) {
    if (lower.includes("chatbot") || lower.includes("nlp")) session.leadDraft.project_type = "NLP / Chatbot";
    else if (lower.includes("vision") || lower.includes("ocr")) session.leadDraft.project_type = "Computer Vision";
    else if (lower.includes("automation")) session.leadDraft.project_type = "Automation";
    else if (lower.includes("analytics") || lower.includes("dashboard")) session.leadDraft.project_type = "Data Analytics";
    else if (lower.includes("machine learning") || lower.includes("ml model")) session.leadDraft.project_type = "Machine Learning";
  }

  const industryMap: Record<string, string> = {
    healthcare: "Healthcare",
    ecommerce: "E-commerce",
    "e-commerce": "E-commerce",
    finance: "Finance",
    retail: "Retail",
    logistics: "Logistics",
    education: "Education",
    manufacturing: "Manufacturing",
  };
  if (!session.leadDraft.industry) {
    for (const [k, v] of Object.entries(industryMap)) {
      if (lower.includes(k)) {
        session.leadDraft.industry = v;
        break;
      }
    }
  }

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)?.[0];
  if (emailMatch) session.leadDraft.email = emailMatch;
  const phoneMatch = text.match(/(?:\+?\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/)?.[0];
  if (phoneMatch && phoneMatch.replace(/\D/g, "").length >= 8) {
    session.leadDraft.phone = phoneMatch.trim();
  }
  if (!session.leadDraft.description) session.leadDraft.description = text;
  if (!session.leadDraft.timeline) {
    const timelineMatch = text.match(
      /\b(?:in|within|around|about)\s+(\d+\s*(?:day|days|week|weeks|month|months)|q[1-4]|this quarter|next quarter)\b/i
    )?.[1];
    if (timelineMatch) {
      session.leadDraft.timeline = timelineMatch.trim();
    }
  }

  const nameMatch = text.match(/(?:my name is|i am|i'm)\s+([a-z][a-z\s'-]{1,40})/i)?.[1];
  if (nameMatch && !session.userName) {
    session.userName = nameMatch.trim().replace(/\s+/g, " ");
    session.leadDraft.name = session.userName;
  }

  const companyMatch = text.match(/(?:company is|from|at)\s+([A-Za-z0-9][A-Za-z0-9\s&._-]{1,50})/i)?.[1];
  if (companyMatch && !session.companyName) {
    session.companyName = companyMatch.trim().replace(/\s+/g, " ");
  }
  if (!session.leadDraft.company && session.companyName) {
    session.leadDraft.company = session.companyName;
  }

  const serviceTags: Array<[RegExp, string]> = [
    [/rag|retrieval/i, "RAG Systems"],
    [/computer vision|ocr|detection/i, "Computer Vision"],
    [/automation|workflow|agent/i, "Automation"],
    [/robotics|robot/i, "Robotics"],
    [/chatbot|nlp|assistant/i, "NLP / Chatbot"],
    [/saas|platform/i, "SaaS Development"],
    [/analytics|dashboard|bi/i, "Data Analytics"],
  ];
  const selected = new Set(session.selectedServices ?? []);
  for (const [rx, label] of serviceTags) {
    if (rx.test(text)) selected.add(label);
  }
  session.selectedServices = Array.from(selected);
  session.projectInterests = Array.from(selected);
  session.leadDraft.selected_services = Array.from(selected);
}

function buildQualificationPrompt(intent: ChatIntent, session: SessionState): string | null {
  if (!(intent === "project" || intent === "pricing" || intent === "lead")) return null;
  const missing: string[] = [];
  if (!session.leadDraft.description) missing.push("What problem are you solving?");
  if (!session.leadDraft.industry) missing.push("What industry/domain is this for?");
  if (!/data|dataset|csv|db|database|logs|history/i.test(session.leadDraft.description || "")) {
    missing.push("Do you have existing data to train/evaluate with?");
  }
  if (!session.leadDraft.timeline) missing.push("What timeline are you targeting?");
  if (!session.leadDraft.email) missing.push("Share your email so we can follow up with a solution outline.");
  if (missing.length === 0) return null;
  return `Ask only one concise qualification question in this reply, prioritizing:\n- ${missing.join(
    "\n- "
  )}\nAfter giving helpful advice, include a soft CTA for either email or a consultation call.`;
}

function suggestedFollowups(intent: ChatIntent): string[] {
  if (intent === "project" || intent === "lead" || intent === "pricing") {
    return [
      "I need an AI chatbot",
      "Automate manual workflows",
      "Build a custom ML model",
      "AI for analytics",
      "Book a consultation call",
    ];
  }
  return ["I need an AI chatbot", "Automate manual workflows", "Build a custom ML model", "AI for analytics"];
}

export async function GET() {
  return NextResponse.json({ llm: isLlmConfigured() });
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  if (isChatSessionPruneEnabled() && now - lastPruneMs > PRUNE_INTERVAL_MS) {
    lastPruneMs = now;
    await pruneSessions(getSessionPruneTtlMs());
  }
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: "LLM is not configured" }, { status: 503 });
  }

  let body: ChatBody;
  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.session_id === "string" ? body.session_id.trim() : "";
  if (!message || !sessionId) {
    return NextResponse.json({ error: "message and session_id are required" }, { status: 400 });
  }
  if (message.length > MAX_TEXT) {
    return NextResponse.json({ error: "message too long" }, { status: 400 });
  }

  const intent = detectIntent(message);
  const session = await getSessionState(sessionId);
  session.updatedAt = Date.now();
  parseLeadDetails(message, session);

  const retrieved = await retrieveContext(message, 4);
  const contextBlock = retrieved
    .map((chunk, idx) => `[${idx + 1}] ${chunk.source}\n${chunk.text}`)
    .join("\n\n");

  const qualification = buildQualificationPrompt(intent, session);
  const memory = session.messages.slice(-MAX_MEMORY);
  const knownProfile = [
    session.userName ? `User name: ${session.userName}` : "",
    session.companyName ? `Company: ${session.companyName}` : "",
    session.selectedServices?.length ? `Selected services: ${session.selectedServices.join(", ")}` : "",
    session.projectInterests?.length ? `Project interests: ${session.projectInterests.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const llmMessages = [
    { role: "system" as const, content: getChatbotSystemPrompt() },
    {
      role: "system" as const,
      content:
        `Intent classified as: ${intent}.\n` +
        `Known user profile:\n${knownProfile || "No profile captured yet."}\n\n` +
        `Retrieved website context:\n${contextBlock || "No context found."}\n\n` +
        (qualification || "No additional qualification prompt required."),
    },
    ...memory,
    { role: "user" as const, content: message },
  ];

  try {
    const reply = await completeChat(llmMessages, 0.25);
    session.messages = [
      ...session.messages,
      { role: "user" as const, content: message },
      { role: "assistant" as const, content: reply },
    ];
    session.updatedAt = Date.now();
    const leadCollected = Boolean(session.leadDraft.email && session.leadDraft.description);
    session.leadCollected = leadCollected;
    await saveSessionState(session);

    return NextResponse.json({
      reply,
      intent,
      lead_collected: leadCollected,
      lead_draft: session.leadDraft,
      suggested_followups: suggestedFollowups(intent),
      rag_sources: retrieved.map((r) => r.source),
    });
  } catch (error) {
    console.error("chat route error:", error);
    return NextResponse.json({ error: "Assistant unavailable" }, { status: 502 });
  }
}
