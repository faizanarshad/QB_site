import type { ChatIntent, SessionState } from "./types";

export function isContactQuery(message: string): boolean {
  return /\b(contact|address|phone|email|office|location|reach you|call you|where are you)\b/i.test(message);
}

export function isTeamQuery(message: string): boolean {
  return /\b(team|who works|founder|ceo|leadership|engineers at qbrix)\b/i.test(message);
}

export function suggestedFollowups(intent: ChatIntent, session: SessionState, message: string): string[] {
  const chips: string[] = [];
  const draft = session.leadDraft;

  if (isContactQuery(message)) {
    return ["Book a consultation call", "I need an AI chatbot", "What services do you offer?"];
  }

  if (isTeamQuery(message)) {
    return ["Book a consultation call", "See portfolio projects", "I need an AI chatbot"];
  }

  if (intent === "project" || intent === "pricing" || intent === "lead") {
    if (!draft.industry) {
      chips.push("Healthcare industry", "E-commerce / retail", "Finance");
    }
    if (!draft.timeline) {
      chips.push("Timeline is 2 months", "Timeline is 3 months");
    }
    if (!/data|dataset|faq|tickets|logs|csv|database/i.test(`${draft.description || ""} ${message}`)) {
      chips.push("We have FAQ docs and support tickets");
    }
    if (!draft.email) {
      chips.push("Book a consultation call");
    }
  }

  const defaults = [
    "I need an AI chatbot",
    "Automate manual workflows",
    "Build a custom ML model",
    "AI for analytics",
  ];
  for (const option of defaults) {
    if (chips.length >= 5) break;
    if (!chips.includes(option)) chips.push(option);
  }

  return chips.slice(0, 5);
}
