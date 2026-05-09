import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type SaveLeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  project_type?: string;
  industry?: string;
  timeline?: string;
  selected_services?: string[];
  session_id?: string;
  description?: string;
  transcript?: string;
  timestamp?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status")?.toUpperCase();
  const needsFollowup = request.nextUrl.searchParams.get("needs_followup") === "true";
  const followupHoursRaw = Number(request.nextUrl.searchParams.get("followup_hours") || 24);
  const followupHours = Number.isFinite(followupHoursRaw) && followupHoursRaw > 0 ? followupHoursRaw : 24;
  if (status && !LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status filter" }, { status: 400 });
  }
  try {
    const leads = needsFollowup
      ? await db.contact.getOverdueLeads(followupHours)
      : await db.contact.getLeads(status || undefined);
    return NextResponse.json(leads);
  } catch (error) {
    console.error("get leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  let body: { id?: string; status?: string };
  try {
    body = (await request.json()) as { id?: string; status?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const id = body.id?.trim() || "";
  const status = body.status?.trim().toUpperCase() || "";
  if (!id || !status || !LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    return NextResponse.json({ error: "id and valid status are required" }, { status: 400 });
  }

  try {
    const updated = await db.contact.updateLeadStatus(id, status);
    return NextResponse.json({ ok: true, id: updated.id, leadStatus: updated.leadStatus });
  } catch (error) {
    console.error("update lead status error:", error);
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: SaveLeadBody;
  try {
    body = (await request.json()) as SaveLeadBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim() || "Website Visitor";
  const email = body.email?.trim() || "";
  const phone = body.phone?.trim() || null;
  const company = body.company?.trim() || null;
  const projectType = body.project_type?.trim() || "AI Consultation";
  const industry = body.industry?.trim() || "Unknown";
  const timeline = body.timeline?.trim() || "Not shared";
  const selectedServices = Array.isArray(body.selected_services)
    ? body.selected_services.map((s) => s.trim()).filter(Boolean).slice(0, 10)
    : [];
  const sessionId = body.session_id?.trim() || "";
  const description = body.description?.trim() || "";
  const transcript = body.transcript?.trim() || "";
  const timestamp = body.timestamp?.trim() || new Date().toISOString();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }
  if (!description) {
    return NextResponse.json({ error: "description is required" }, { status: 400 });
  }

  try {
    const subject = `[AI Lead] ${projectType} | ${industry}`;
    const metadata = [
      `Captured timestamp: ${timestamp}`,
      `Session ID: ${sessionId || "n/a"}`,
      `Timeline: ${timeline}`,
      `Selected services: ${selectedServices.join(", ") || "n/a"}`,
      "",
      "Lead description:",
      description,
      transcript ? `\nTranscript:\n${transcript}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const existing = await db.contact.findLatestByEmail(email);
    const saved = existing
      ? await db.contact.update(existing.id, {
          name,
          subject,
          message: metadata,
          phone,
          company: company || industry,
          source: "chatbot",
          sessionId: sessionId || undefined,
          timeline,
          selectedServices,
        })
      : await db.contact.submit({
          name,
          email,
          subject,
          message: metadata,
          phone,
          company: company || industry,
          source: "chatbot",
          sessionId: sessionId || undefined,
          timeline,
          selectedServices,
        });

    return NextResponse.json(
      {
        ok: true,
        id: saved.id,
        updated: Boolean(existing),
        timestamp: saved.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("save lead error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
