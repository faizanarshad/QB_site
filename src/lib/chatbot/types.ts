export type ChatIntent = "info" | "project" | "pricing" | "casual" | "lead";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type LeadDraft = {
  name?: string;
  email?: string;
  project_type?: string;
  industry?: string;
  description?: string;
  timeline?: string;
};

export type SessionState = {
  sessionId: string;
  messages: ChatMessage[];
  leadDraft: LeadDraft;
  leadCollected: boolean;
  updatedAt: number;
};

export type RetrievedChunk = {
  id: string;
  source: string;
  text: string;
  score: number;
};
