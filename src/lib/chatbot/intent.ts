import type { ChatIntent } from "./types";

const projectTerms = [
  "build",
  "develop",
  "project",
  "solution",
  "automation",
  "chatbot",
  "computer vision",
  "ml model",
  "machine learning",
  "ai system",
  "mvp",
  "proposal",
  "scope",
  "integration",
];

const pricingTerms = ["pricing", "cost", "quote", "budget", "price", "estimate"];
const leadTerms = ["email", "contact", "meeting", "book", "call", "reach out"];

export function detectIntent(message: string): ChatIntent {
  const text = message.toLowerCase();

  if (leadTerms.some((t) => text.includes(t))) return "lead";
  if (pricingTerms.some((t) => text.includes(t))) return "pricing";
  if (projectTerms.some((t) => text.includes(t))) return "project";

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount <= 3) return "casual";
  return "info";
}

export function looksLikeProjectIntent(message: string): boolean {
  const intent = detectIntent(message);
  return intent === "project" || intent === "pricing" || intent === "lead";
}
