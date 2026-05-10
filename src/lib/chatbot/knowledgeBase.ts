import { portfolioProjects } from "@/data/portfolioProjects";

export type KnowledgeDoc = {
  id: string;
  source: string;
  text: string;
};

const staticDocs: KnowledgeDoc[] = [
  {
    id: "home-overview",
    source: "Homepage",
    text:
      "QBrix Solutions is an AI/ML development company helping startups, SMEs, and enterprises integrate AI systems. Core service areas include AI solutions, machine learning model development, NLP, computer vision, chatbot development, business automation, and data analytics.",
  },
  {
    id: "ai-solutions",
    source: "AI Solutions Page",
    text:
      "QBrix builds practical AI solutions such as predictive analytics, NLP assistants, deep learning systems, computer vision pipelines, and workflow automation tailored to business outcomes.",
  },
  {
    id: "services-catalog",
    source: "Services Page",
    text:
      "Service lines: Artificial Intelligence Solutions, Machine Learning Model Development, Natural Language Processing, Computer Vision Systems, Chatbot and Conversational AI, Business Process Automation, Data Analytics and Visualization.",
  },
  {
    id: "company-contact",
    source: "Contact Page",
    text:
      "Contact QBrix Solutions: support@qbrixsolutions.com, +92 339 4101341, office at 3rd Floor Gulberg Emporium, Business Square, Islamabad, Pakistan.",
  },
  {
    id: "company-about",
    source: "Homepage / About section",
    text:
      "On the homepage, the About section (id about) explains why clients choose QBrix: AI-powered solutions, computer vision, e-commerce, and automation, plus innovation and delivery strengths. Company overview and positioning appear there alongside the rest of the marketing site.",
  },
];

export function getKnowledgeDocuments(): KnowledgeDoc[] {
  const projectDocs: KnowledgeDoc[] = portfolioProjects.map((project) => ({
    id: `portfolio-${project.slug}`,
    source: `Portfolio: ${project.title}`,
    text:
      `Project ${project.title}. Summary: ${project.summary}. Problem: ${project.problem}. ` +
      `Solution: ${project.solution}. Results: ${project.results}. Technologies: ${project.technologies.join(", ")}.`,
  }));

  return [...staticDocs, ...projectDocs];
}
