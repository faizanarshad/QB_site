import { promises as fs } from "fs";
import path from "path";
import { createEmbeddings } from "@/lib/chatbot/openai";
import { getKnowledgeDocuments } from "@/lib/chatbot/knowledgeBase";

const OUT_PATH = path.join(process.cwd(), "src/data/rag/qbrix-rag-index.json");
const CHUNK_WORDS = 90;
const CHUNK_OVERLAP = 20;

function chunkText(text: string): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  if (words.length <= CHUNK_WORDS) return [text];
  const chunks: string[] = [];
  const step = CHUNK_WORDS - CHUNK_OVERLAP;
  for (let i = 0; i < words.length; i += step) {
    const block = words.slice(i, i + CHUNK_WORDS).join(" ").trim();
    if (block) chunks.push(block);
    if (i + CHUNK_WORDS >= words.length) break;
  }
  return chunks;
}

async function main() {
  const docs = getKnowledgeDocuments();
  const chunks: Array<{ id: string; source: string; text: string }> = [];
  docs.forEach((doc) => {
    chunkText(doc.text).forEach((text, idx) => {
      chunks.push({ id: `${doc.id}-${idx}`, source: doc.source, text });
    });
  });

  const embeddings = await createEmbeddings(chunks.map((chunk) => chunk.text));
  const payload = {
    createdAt: new Date().toISOString(),
    model: process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small",
    chunks: chunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i] || [],
    })),
  };

  await fs.writeFile(OUT_PATH, JSON.stringify(payload, null, 2), "utf8");
  console.log(`RAG index written: ${OUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to build RAG index:", error);
  process.exit(1);
});
