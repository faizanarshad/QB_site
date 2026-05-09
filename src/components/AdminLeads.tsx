"use client";

import React, { useEffect, useMemo, useState } from "react";

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "WON" | "LOST";
type LeadFilter = LeadStatus | "ALL" | "NEEDS_FOLLOWUP";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  leadStatus: LeadStatus;
  source: string | null;
  sessionId: string | null;
  timeline: string | null;
  selectedServices: string[];
  createdAt: string;
};

const ALL_STATUSES: LeadStatus[] = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"];
const FOLLOW_UP_HOURS = 24;

function statusClass(status: LeadStatus): string {
  if (status === "NEW") return "bg-gray-100 text-gray-800";
  if (status === "CONTACTED") return "bg-blue-100 text-blue-800";
  if (status === "QUALIFIED") return "bg-purple-100 text-purple-800";
  if (status === "WON") return "bg-green-100 text-green-800";
  return "bg-red-100 text-red-800";
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<LeadFilter>("ALL");

  async function fetchLeads(filter: LeadFilter = statusFilter) {
    setIsLoading(true);
    try {
      const url =
        filter === "ALL"
          ? "/api/save-lead"
          : filter === "NEEDS_FOLLOWUP"
            ? `/api/save-lead?needs_followup=true&followup_hours=${FOLLOW_UP_HOURS}`
            : `/api/save-lead?status=${filter}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch leads");
      const data = (await res.json()) as Lead[];
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchLeads("ALL");
  }, []);

  async function updateStatus(id: string, status: LeadStatus) {
    try {
      const res = await fetch("/api/save-lead", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed to update lead");
      setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, leadStatus: status } : lead)));
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  }

  const totals = useMemo(() => {
    const counts: Record<LeadStatus, number> = { NEW: 0, CONTACTED: 0, QUALIFIED: 0, WON: 0, LOST: 0 };
    for (const lead of leads) counts[lead.leadStatus] += 1;
    return counts;
  }, [leads]);

  const followupOverdueCount = useMemo(() => {
    const cutoff = Date.now() - FOLLOW_UP_HOURS * 60 * 60 * 1000;
    return leads.filter((lead) => {
      const created = new Date(lead.createdAt).getTime();
      return (lead.leadStatus === "NEW" || lead.leadStatus === "CONTACTED") && created < cutoff;
    }).length;
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Pipeline</h1>
            <p className="text-gray-600">Track and convert chatbot leads from first touch to close.</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                const value = e.target.value as LeadFilter;
                setStatusFilter(value);
                void fetchLeads(value);
              }}
              className="rounded border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="ALL">All</option>
              <option value="NEEDS_FOLLOWUP">Needs Follow-up ({`>${FOLLOW_UP_HOURS}h`})</option>
              {ALL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {ALL_STATUSES.map((status) => (
            <div key={status} className={`rounded-lg px-4 py-3 text-sm font-semibold ${statusClass(status)}`}>
              {status}: {totals[status]}
            </div>
          ))}
        </div>
        {followupOverdueCount > 0 ? (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {followupOverdueCount} lead(s) need follow-up now (older than {FOLLOW_UP_HOURS} hours in NEW/CONTACTED).
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500">No leads found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Lead</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Timeline</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Created</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Reminder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-gray-600">{lead.email}</div>
                      {lead.phone ? <div className="text-gray-500">{lead.phone}</div> : null}
                      {lead.company ? <div className="text-gray-500">{lead.company}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <div>{lead.subject.replace("[AI Lead] ", "")}</div>
                      {lead.selectedServices.length > 0 ? (
                        <div className="mt-1 text-xs text-gray-500">{lead.selectedServices.join(", ")}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{lead.timeline || "Not shared"}</td>
                    <td className="px-4 py-3 text-sm">
                      <select
                        value={lead.leadStatus}
                        onChange={(e) => void updateStatus(lead.id, e.target.value as LeadStatus)}
                        className={`rounded border px-2 py-1 text-xs font-semibold ${statusClass(lead.leadStatus)}`}
                      >
                        {ALL_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{new Date(lead.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      {(lead.leadStatus === "NEW" || lead.leadStatus === "CONTACTED") &&
                      new Date(lead.createdAt).getTime() < Date.now() - FOLLOW_UP_HOURS * 60 * 60 * 1000 ? (
                        <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                          Follow-up overdue
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">On track</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
