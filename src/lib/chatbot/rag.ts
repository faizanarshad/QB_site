import { promises as fs } from "fs";
import path from "path";
import { createEmbeddings } from "./openai";
import { getKnowledgeDocuments } from "./knowledgeBase";
import type { RetrievedChunk } from "./types";

type StoredChunk = {
  id: string;
  source: string;
  text: string;
  embedding: number[];
};

type RagIndex = {
  createdAt: string;
  model: string;
  chunks: StoredChunk[];
};

const INDEX_PATH = path.join(process.cwd(), "src/data/rag/qbrix-rag-index.json");
const CHUNK_WORDS = 90;
const CHUNK_OVERLAP = 20;

function tokenize(text: string): string[] {
  return text.replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i += 1) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (!na || !nb) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function chunkText(text: string): string[] {
  const words = tokenize(text);
  if (words.length <= CHUNK_WORDS) return [text];
  const chunks: string[] = [];
  const step = CHUNK_WORDS - CHUNK_OVERLAP;
  for (let i = 0; i < words.length; i += step) {
    const segment = words.slice(i, i + CHUNK_WORDS).join(" ").trim();
    if (segment) chunks.push(segment);
    if (i + CHUNK_WORDS >= words.length) break;
  }
  return chunks;
}

function lexicalTopK(query: string, topK: number): RetrievedChunk[] {
  const q = query.toLowerCase();
  const qTokens = new Set(tokenize(q));
  const docs = getKnowledgeDocuments();
  return docs
    .map((doc) => {
      const docTokens = new Set(tokenize(doc.text.toLowerCase()));
      let shared = 0;
      qTokens.forEach((t) => {
        if (docTokens.has(t)) shared += 1;
      });
      return { id: doc.id, source: doc.source, text: doc.text, score: shared / (qTokens.size || 1) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

async function buildIndex(): Promise<RagIndex> {
  const docs = getKnowledgeDocuments();
  const flattened: Array<{ id: string; source: string; text: string }> = [];
  docs.forEach((doc) => {
    const chunks = chunkText(doc.text);
    chunks.forEach((text, i) => flattened.push({ id: `${doc.id}-${i}`, source: doc.source, text }));
  });

  const embeddings = await createEmbeddings(flattened.map((c) => c.text));
  const index: RagIndex = {
    createdAt: new Date().toISOString(),
    model: process.env.OPENAI_EMBEDDING_MODEL?.trim() || "text-embedding-3-small",
    chunks: flattened.map((chunk, i) => ({ ...chunk, embedding: embeddings[i] || [] })),
  };
  await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), "utf8");
  return index;
}

async function loadIndex(): Promise<RagIndex> {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    return JSON.parse(raw) as RagIndex;
  } catch {
    return buildIndex();
  }
}

export async function retrieveContext(query: string, topK = 4): Promise<RetrievedChunk[]> {
  try {
    const index = await loadIndex();
    const [queryEmbedding] = await createEmbeddings([query]);
    if (!queryEmbedding) return lexicalTopK(query, topK);
    return index.chunks
      .map((chunk) => ({
        id: chunk.id,
        source: chunk.source,
        text: chunk.text,
        score: cosine(queryEmbedding, chunk.embedding),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  } catch (error) {
    console.error("RAG retrieval fallback to lexical:", error);
    return lexicalTopK(query, topK);
  }
}
