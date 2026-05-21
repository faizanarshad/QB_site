import type { SessionState } from "./types";

export const QBrix_CONTACT_FACTS =
  "Contact QBrix Solutions: support@qbrixsolutions.com, +92 339 4101341, office at 3rd Floor Gulberg Emporium, Business Square, Islamabad, Pakistan.";

export function parseTimeline(text: string): string | undefined {
  const patterns = [
    /\b(?:in|within|around|about)\s+(\d+\s*(?:day|days|week|weeks|month|months)|q[1-4]|this quarter|next quarter)\b/i,
    /\btimeline\s*(?:is|:|=|-)\s*(\d+\s*(?:day|days|week|weeks|month|months)|q[1-4]|this quarter|next quarter)\b/i,
    /\b(\d+\s*(?:day|days|week|weeks|month|months))\s*(?:timeline|timeframe|deadline)\b/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return undefined;
}

export function parseCompanyName(text: string): string | undefined {
  const patterns = [
    /(?:my company is|company is|company name is|work at|work for|working at|working for|based at|based in)\s+([A-Za-z0-9][A-Za-z0-9\s&._'-]{1,50})/i,
    /(?:i'?m from|we'?re from)\s+([A-Za-z0-9][A-Za-z0-9\s&._'-]{1,50})/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match?.[1]) continue;
    const name = match[1].trim().replace(/\s+/g, " ");
    if (/^(what|how|when|where|why|is|are|the|your|our|a|an)\b/i.test(name)) continue;
    return name;
  }
  return undefined;
}

export function parseLeadDetails(text: string, session: SessionState): void {
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
    for (const [key, value] of Object.entries(industryMap)) {
      if (lower.includes(key)) {
        session.leadDraft.industry = value;
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

  const timeline = parseTimeline(text);
  if (timeline && !session.leadDraft.timeline) {
    session.leadDraft.timeline = timeline;
  }

  const nameMatch = text.match(/(?:my name is|i am|i'm)\s+([a-z][a-z\s'-]{1,40})/i)?.[1];
  if (nameMatch && !session.userName) {
    session.userName = nameMatch.trim().replace(/\s+/g, " ");
    session.leadDraft.name = session.userName;
  }

  const companyName = parseCompanyName(text);
  if (companyName && !session.companyName) {
    session.companyName = companyName;
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
  for (const [pattern, label] of serviceTags) {
    if (pattern.test(text)) selected.add(label);
  }
  session.selectedServices = Array.from(selected);
  session.projectInterests = Array.from(selected);
  session.leadDraft.selected_services = Array.from(selected);
}
