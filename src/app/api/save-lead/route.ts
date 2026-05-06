import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type SaveLeadBody = {
  name?: string;
  email?: string;
  project_type?: string;
  industry?: string;
  description?: string;
  timestamp?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: SaveLeadBody;
  try {
    body = (await request.json()) as SaveLeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim() || "Website Visitor";
  const email = body.email?.trim() || "";
  const projectType = body.project_type?.trim() || "AI Consultation";
  const industry = body.industry?.trim() || "Unknown";
  const description = body.description?.trim() || "";
  const timestamp = body.timestamp?.trim() || new Date().toISOString();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!description) {
    return NextResponse.json({ error: "description is required" }, { status: 400 });
  }

  try {
    const saved = await db.contact.submit({
      name,
      email,
      subject: `[AI Lead] ${projectType} | ${industry}`,
      message: `${description}\n\nCaptured timestamp: ${timestamp}`,
      phone: null,
      company: industry,
    });

    return NextResponse.json(
      {
        ok: true,
        id: saved.id,
        timestamp: saved.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("save lead error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
