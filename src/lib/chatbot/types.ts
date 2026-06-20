export type ChatIntent = "info" | "project" | "pricing" | "casual" | "lead";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

/** Superset of ChatMessage — includes system role for OpenAI API calls. */
export type LlmMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type LeadDraft = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  project_type?: string;
  industry?: string;
  description?: string;
  timeline?: string;
  selected_services?: string[];
};

export type SessionState = {
  sessionId: string;
  messages: ChatMessage[];
  leadDraft: LeadDraft;
  leadCollected: boolean;
  userName?: string;
  companyName?: string;
  selectedServices?: string[];
  projectInterests?: string[];
  updatedAt: number;
};

export type RetrievedChunk = {
  id: string;
  source: string;
  text: string;
  score: number;
};
