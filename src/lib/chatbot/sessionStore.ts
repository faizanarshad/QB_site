import { prisma } from "@/lib/prisma";
import type { ChatMessage, SessionState } from "./types";

const inMemoryStore = new Map<string, SessionState>();
const MAX_MEMORY_MESSAGES = 20;

type LeadDraftPersisted = SessionState["leadDraft"] & {
  userName?: string;
  companyName?: string;
  selectedServices?: string[];
  projectInterests?: string[];
};

function nowMs(): number {
  return Date.now();
}

function toInMemory(sessionId: string): SessionState {
  const existing = inMemoryStore.get(sessionId);
  if (existing) return existing;
  const created: SessionState = {
    sessionId,
    messages: [],
    leadDraft: {},
    leadCollected: false,
    updatedAt: nowMs(),
  };
  inMemoryStore.set(sessionId, created);
  return created;
}

function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.slice(-MAX_MEMORY_MESSAGES).filter((m) => (m.role === "user" || m.role === "assistant") && Boolean(m.content?.trim()));
}

export async function getSessionState(sessionId: string): Promise<SessionState> {
  try {
    const row = await prisma.chatSession.findUnique({
      where: { sessionId },
      include: { messages: { orderBy: { createdAt: "asc" }, take: MAX_MEMORY_MESSAGES } },
    });
    if (!row) {
      return {
        sessionId,
        messages: [],
        leadDraft: {},
        leadCollected: false,
        updatedAt: nowMs(),
      };
    }

    const leadDraft = (row.leadDraft ?? {}) as LeadDraftPersisted;
    return {
      sessionId: row.sessionId,
      messages: row.messages.map((m) => ({ role: m.role as ChatMessage["role"], content: m.content })),
      leadDraft: {
        name: leadDraft.name,
        email: leadDraft.email,
        project_type: leadDraft.project_type,
        industry: leadDraft.industry,
        description: leadDraft.description,
        timeline: leadDraft.timeline,
      },
      leadCollected: row.leadCollected,
      userName: leadDraft.userName,
      companyName: leadDraft.companyName,
      selectedServices: Array.isArray(leadDraft.selectedServices) ? leadDraft.selectedServices : [],
      projectInterests: Array.isArray(leadDraft.projectInterests) ? leadDraft.projectInterests : [],
      updatedAt: row.updatedAt.getTime(),
    };
  } catch (error) {
    console.warn("Chat session DB read failed, using memory fallback:", error);
    return toInMemory(sessionId);
  }
}

export async function saveSessionState(session: SessionState): Promise<void> {
  const safeMessages = normalizeMessages(session.messages);
  const leadDraftPersisted: LeadDraftPersisted = {
    ...session.leadDraft,
    userName: session.userName,
    companyName: session.companyName,
    selectedServices: session.selectedServices ?? [],
    projectInterests: session.projectInterests ?? [],
  };

  try {
    const upserted = await prisma.chatSession.upsert({
      where: { sessionId: session.sessionId },
      update: {
        leadDraft: leadDraftPersisted,
        leadCollected: session.leadCollected,
      },
      create: {
        sessionId: session.sessionId,
        leadDraft: leadDraftPersisted,
        leadCollected: session.leadCollected,
      },
      select: { id: true },
    });

    await prisma.$transaction([
      prisma.chatMsg.deleteMany({ where: { chatSessionId: upserted.id } }),
      prisma.chatMsg.createMany({
        data: safeMessages.map((m) => ({
          chatSessionId: upserted.id,
          role: m.role,
          content: m.content,
        })),
      }),
    ]);
  } catch (error) {
    console.warn("Chat session DB write failed, using memory fallback:", error);
    inMemoryStore.set(session.sessionId, {
      ...session,
      messages: safeMessages,
      updatedAt: nowMs(),
    });
  }
}

export async function pruneSessions(olderThanMs: number): Promise<void> {
  try {
    await prisma.chatSession.deleteMany({
      where: {
        updatedAt: {
          lt: new Date(Date.now() - olderThanMs),
        },
      },
    });
  } catch {
    const cutoff = Date.now() - olderThanMs;
    for (const [id, state] of inMemoryStore.entries()) {
      if (state.updatedAt < cutoff) inMemoryStore.delete(id);
    }
  }
}
