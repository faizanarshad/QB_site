/**
 * Rule-based chat replies: normalized tokens, word-safe phrases, scored intents
 * so the best-matching rule wins (fixes e.g. "examples of AI" → portfolio, "AI team" → team only).
 */

import { teamMembers } from "../data/teamMembers";

export type BotReply = {
  text: string;
  quickReplies?: string[];
};

export type ChatRule = {
  /** Tie-break when two rules have the same score */
  priority: number;
  /** Multi-word: substring on `norm`. Single word: exact token only (avoids "contacts" → "contact"). */
  phrases?: string[];
  /** Whole-token match */
  tokens?: string[];
  reply: BotReply;
  /** Build reply from site data instead of static `reply` */
  dynamicReply?: "team";
};

export const CHATBOT_WELCOME: BotReply = {
  text: "Hello — I’m the QBrix site assistant. Ask me about AI/ML, computer vision, e‑commerce, automation, our portfolio, team, careers, or how to reach us. What would you like to explore?",
  quickReplies: [
    "Tell me about AI services",
    "Show me your portfolio",
    "Contact information",
    "Pricing details",
    "Careers & jobs",
  ],
};

const DEFAULT_REPLY: BotReply = {
  text: "Thanks for your message. Try a clearer keyword (AI, vision, e‑commerce, robotics, portfolio, pricing, contact, careers) or use the chips below. For a formal inquiry, use the Contact page on this site or email support@qbrixsolutions.com.",
  quickReplies: ["AI Services", "Portfolio", "Contact Info", "Pricing", "Careers & jobs"],
};

const RULES: ChatRule[] = [
  {
    priority: 92,
    phrases: [
      "ai team",
      "ml team",
      "machine learning team",
      "data science team",
      "engineering team",
      "meet our ai team",
    ],
    tokens: [],
    reply: {
      text: "🤖 For AI & ML, we cover custom models, forecasting, NLP, and deep learning—from discovery to production. Solution architects and ML engineers stay aligned so scope and delivery stay predictable.\n\nWant portfolio examples, a consult, or pricing next?",
      quickReplies: ["Show AI examples", "Request consultation", "Learn about pricing", "Computer vision"],
    },
  },
  {
    priority: 91,
    phrases: [
      "careers",
      "job opening",
      "job openings",
      "we are hiring",
      "internship",
      "apply for job",
      "send resume",
      "vacancy",
      "join our team",
    ],
    tokens: ["hiring", "jobs", "career"],
    reply: {
      text: "💼 Explore open roles and how to apply on our Careers page (/career). You’ll find descriptions, requirements, and application options there.\n\nPrefer a quick question first? Use the chips below or email support@qbrixsolutions.com with your CV and role interest.",
      quickReplies: ["Open careers page", "Contact HR", "Internships", "AI Services"],
    },
  },
  {
    priority: 100,
    phrases: [
      "portfolio",
      "case studies",
      "case study",
      "past work",
      "show ai examples",
      "analytics dashboard",
      "client work",
      "our work",
      "previous projects",
    ],
    tokens: [],
    reply: {
      text: "📊 Here are some highlights from our portfolio:\n\n🏭 AI-Powered Manufacturing QC\n• Reduced defects by 85%\n• Increased efficiency by 40%\n\n🛒 E-commerce Platform\n• 35% increase in conversion\n• 25% higher order value\n\n📈 Predictive Analytics Dashboard\n• 60% faster decisions\n• 45% improved accuracy\n\nWould you like to see more details about any specific project?",
      quickReplies: ["Manufacturing QC", "E-commerce Platform", "Analytics Dashboard", "Contact Sales"],
    },
  },
  {
    priority: 95,
    phrases: [
      "pricing",
      "price range",
      "how much",
      "free quote",
      "roi calculator",
      "payment terms",
      "learn about pricing",
    ],
    tokens: ["quote", "cost"],
    reply: {
      text: "💰 Our pricing is competitive and flexible:\n\n• Custom AI Solutions: $50K - $500K+\n• E-commerce Platforms: $30K - $200K+\n• Computer Vision Systems: $25K - $150K+\n• Robotics Automation: $100K - $1M+\n\nWe offer:\n✅ Free initial consultation\n✅ Flexible payment terms\n✅ ROI guarantee\n✅ Ongoing support\n\nWould you like a detailed quote for your specific needs?",
      quickReplies: ["Get Free Quote", "Schedule Consultation", "View Pricing Guide", "ROI Calculator"],
    },
  },
  {
    priority: 90,
    phrases: [
      "contact",
      "support qbrixsolutions",
      "get in touch",
      "reach out",
      "phone number",
      "visit office",
      "islamabad",
      "schedule consultation",
      "send email",
      "contact sales",
    ],
    tokens: ["email", "phone", "whatsapp"],
    reply: {
      text: "📞 Here's how to reach us:\n\n📧 Email: support@qbrixsolutions.com\n📱 Phone: +92 339 4101341\n💬 WhatsApp: +92 339 4101341\n📍 Office: 3rd Floor Gulberg Emporium, Business Square, Islamabad, Pakistan\n\nOur team is available Mon-Fri, 8am-6pm for consultations. Would you like to schedule a call?",
      quickReplies: ["Schedule Consultation", "Send Email", "WhatsApp Chat", "Visit Office"],
    },
  },
  {
    priority: 88,
    phrases: [
      "computer vision",
      "object detection",
      "facial recognition",
      "medical imaging",
      "video analytics",
      "image processing",
      "image analysis",
      "manufacturing qc",
      "security systems",
      "retail analytics",
      "opencv",
      "quality control automation",
    ],
    tokens: ["vision"],
    reply: {
      text: "👁️ Our Computer Vision solutions include:\n\n• Object Detection & Recognition\n• Facial Recognition Systems\n• Quality Control Automation\n• Medical Imaging Analysis\n• Video Analytics & Monitoring\n\nWe've implemented vision systems that improved accuracy by 95%. How can computer vision benefit your industry?",
      quickReplies: ["Manufacturing QC", "Security Systems", "Medical Imaging", "Retail Analytics"],
    },
  },
  {
    priority: 86,
    phrases: [
      "e-commerce",
      "e commerce",
      "ecommerce",
      "online store",
      "b2b marketplace",
      "consumer retail",
      "marketplace",
      "inventory management",
      "shopping cart",
      "payment gateway",
    ],
    tokens: [],
    reply: {
      text: "🛒 Our E-commerce solutions include:\n\n• AI-Powered Product Recommendations\n• Custom E-commerce Platforms\n• B2B & B2C Marketplaces\n• Payment Integration & Security\n• Inventory Management Systems\n\nOur platforms have increased conversion rates by 35% on average. What type of e-commerce solution are you looking for?",
      quickReplies: ["B2B Marketplace", "Consumer Retail", "Custom Platform", "AI Recommendations"],
    },
  },
  {
    priority: 84,
    phrases: [
      "robotics",
      "industrial automation",
      "smart manufacturing",
      "rpa",
      "robotic process",
      "iot integration",
      "warehouse automation",
      "factory automation",
      "plc",
      "scada",
    ],
    tokens: ["iot"],
    reply: {
      text: "⚙️ Our Robotics & Automation services include:\n\n• Industrial Process Automation\n• Smart Manufacturing Systems\n• IoT Integration & Monitoring\n• Robotic Process Automation (RPA)\n• Quality Control Automation\n\nWe've helped clients reduce operational costs by 70%. What automation challenges are you facing?",
      quickReplies: ["Industrial Automation", "Smart Manufacturing", "RPA Solutions", "IoT Integration"],
    },
  },
  {
    priority: 75,
    phrases: ["meet the team", "linkedin", "schedule meeting", "who works at", "company culture"],
    tokens: ["team", "experts"],
    reply: {
      text: "",
      quickReplies: ["Meet the Team", "View LinkedIn Profiles", "Schedule Meeting", "Join Our Team"],
    },
    dynamicReply: "team",
  },
  {
    priority: 72,
    phrases: [
      "tech stack",
      "technology stack",
      "tensorflow",
      "pytorch",
      "postgresql",
      "programming languages",
      "what technologies",
      "what stack",
    ],
    tokens: ["technology", "tools"],
    reply: {
      text: "🛠️ Our technology stack includes:\n\nFrontend: React ⚛️, Next.js ⚡, TypeScript 📘\nBackend: Python 🐍, Node.js 🟢, PostgreSQL 🐘\nAI/ML: TensorFlow 🧠, PyTorch 🔥, OpenCV 👁️\nCloud: AWS ☁️, Azure ☁️, Google Cloud ☁️\n\nWe use cutting-edge technologies to deliver scalable, secure, and high-performance solutions.",
      quickReplies: ["AI Technologies", "Web Technologies", "Cloud Services", "Security Features"],
    },
  },
  {
    priority: 70,
    phrases: [
      "artificial intelligence",
      "machine learning",
      "deep learning",
      "neural network",
      "predictive analytics",
      "nlp",
      "natural language",
      "request consultation",
      "data science",
      "ml model",
      "ai model",
    ],
    tokens: ["ai", "ml"],
    reply: {
      text: "🤖 Our AI & Machine Learning services include:\n\n• Custom ML Models & Neural Networks\n• Predictive Analytics & Forecasting\n• Natural Language Processing\n• Deep Learning Solutions\n• Automated Decision Making\n\nWe've helped businesses increase efficiency by 40% and reduce costs by 60%. Would you like to see some examples?",
      quickReplies: ["Show AI examples", "Request consultation", "Learn about pricing", "Meet our AI team"],
    },
  },
  {
    priority: 40,
    phrases: [],
    tokens: ["hello", "hi", "hey"],
    reply: {
      text: "Hello! Welcome to QBrix Solutions. I'm here to help you with our cutting-edge AI, ML, Computer Vision, E-commerce, and Robotics services. What would you like to explore today?",
      quickReplies: ["AI & Machine Learning", "Computer Vision", "E-commerce Solutions", "Robotics & Automation"],
    },
  },
].sort((a, b) => b.priority - a.priority);

function buildTeamDynamicReply(): BotReply {
  const lines = teamMembers.slice(0, 5).map((m) => `• ${m.name} — ${m.role}`);
  return {
    text: `👥 Leadership and team profiles are on /team (bios, experience, and social links).\n\n${lines.join("\n")}\n… and more colleagues across delivery and engineering.\n\nNext: explore services, portfolio, or contact us below.`,
    quickReplies: ["Meet the Team", "View LinkedIn Profiles", "Schedule Meeting", "Join Our Team"],
  };
}

function normalizeInput(raw: string): { norm: string; tokens: Set<string> } {
  const norm = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const tokens = new Set(norm.split(" ").filter(Boolean));
  return { norm, tokens };
}

/** Single-word phrases must match a full token; multi-word phrases match as substring of `norm`. */
function phraseHits(norm: string, phrase: string, tokenSet: Set<string>): boolean {
  const q = phrase.toLowerCase().replace(/\s+/g, " ").trim();
  if (!q) return false;
  if (!q.includes(" ")) {
    return tokenSet.has(q);
  }
  return norm.includes(q);
}

function ruleScore(rule: ChatRule, norm: string, tokenSet: Set<string>): number {
  let phrasePart = 0;
  for (const p of rule.phrases ?? []) {
    if (phraseHits(norm, p, tokenSet)) {
      const weight = Math.max(12, p.replace(/\s+/g, "").length * 4);
      phrasePart = Math.max(phrasePart, weight);
    }
  }
  let tokenPart = 0;
  for (const t of rule.tokens ?? []) {
    const tl = t.toLowerCase();
    if (tokenSet.has(tl)) tokenPart += 14;
  }
  return phrasePart + tokenPart;
}

/** Map quick-reply labels to text the matcher understands */
const QUICK_REPLY_EXPAND: Record<string, string> = {
  "Tell me about AI services": "artificial intelligence and machine learning services",
  "Show me your portfolio": "portfolio and case studies",
  "Contact information": "contact email phone and office",
  "Pricing details": "pricing and quote",
  "Careers & jobs": "careers job openings hiring",
  "Open careers page": "careers page job openings",
  "Contact HR": "careers hiring contact email",
  Internships: "internship careers apply",
  "AI & Machine Learning": "artificial intelligence and machine learning",
  "Computer Vision": "computer vision solutions",
  "E-commerce Solutions": "e-commerce platform and online store",
  "Robotics & Automation": "robotics and industrial automation",
  "AI Services": "artificial intelligence services",
  Portfolio: "portfolio and past projects",
  "Contact Info": "contact information",
  Pricing: "pricing and cost estimate",
  "Show AI examples": "portfolio case studies and examples",
  "Request consultation": "schedule consultation and request meeting",
  "Learn about pricing": "pricing and cost",
  "Meet our AI team": "ai team and machine learning experts",
  "Manufacturing QC": "manufacturing quality control computer vision",
  "E-commerce Platform": "e-commerce platform project",
  "Analytics Dashboard": "analytics dashboard portfolio",
  "Contact Sales": "contact sales team",
  "Get Free Quote": "free quote pricing",
  "Schedule Consultation": "schedule consultation meeting",
  "View Pricing Guide": "pricing guide and cost",
  "ROI Calculator": "roi calculator pricing",
  "Send Email": "send email contact",
  "WhatsApp Chat": "whatsapp contact",
  "Visit Office": "visit office islamabad",
  "B2B Marketplace": "b2b marketplace e-commerce",
  "Consumer Retail": "consumer retail e-commerce",
  "Custom Platform": "custom e-commerce platform",
  "AI Recommendations": "ai product recommendations e-commerce",
  "Industrial Automation": "industrial automation robotics",
  "Smart Manufacturing": "smart manufacturing automation",
  "RPA Solutions": "rpa robotic process automation",
  "IoT Integration": "iot integration monitoring",
  "Meet the Team": "meet the team company",
  "View LinkedIn Profiles": "linkedin team profiles",
  "Schedule Meeting": "schedule meeting consultation",
  "Join Our Team": "join our team careers",
  "AI Technologies": "ai ml technology stack",
  "Web Technologies": "web frontend technology stack",
  "Cloud Services": "aws azure cloud technology",
  "Security Features": "security compliance technology",
  "Computer vision": "computer vision solutions",
  "Security Systems": "security systems computer vision",
  "Medical Imaging": "medical imaging computer vision",
  "Retail Analytics": "retail analytics computer vision",
};

export function expandQuickReply(label: string): string {
  return QUICK_REPLY_EXPAND[label] ?? label;
}

export function matchBotReply(userInput: string): BotReply {
  const { norm, tokens } = normalizeInput(userInput);
  if (!norm) {
    return { text: CHATBOT_WELCOME.text, quickReplies: CHATBOT_WELCOME.quickReplies };
  }

  let best: { rule: ChatRule; score: number } | null = null;
  for (const rule of RULES) {
    const score = ruleScore(rule, norm, tokens);
    if (score <= 0) continue;
    if (
      !best ||
      score > best.score ||
      (score === best.score && rule.priority > best.rule.priority)
    ) {
      best = { rule, score };
    }
  }

  if (best) {
    if (best.rule.dynamicReply === "team") {
      return buildTeamDynamicReply();
    }
    return best.rule.reply;
  }
  return DEFAULT_REPLY;
}
