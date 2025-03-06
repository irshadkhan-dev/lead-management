"use client";

import { useState } from "react";
import { Leads, LeadStatus } from "@/types";

interface LeadFormProps {
  onSubmit: (lead: Omit<Leads, "id" | "createdAt">) => void;
}

export function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New" as LeadStatus,
    value: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      value: Number(formData.value),
    });
    setFormData({
      name: "",
      email: "",
      status: "New",
      value: "",
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value as LeadStatus })
            }
          >
            <option value="New">New</option>
            <option value="Engaged">Engaged</option>
            <option value="ProposalSent">Proposal Sent</option>
            <option value="ClosedWon">Closed Won</option>
            <option value="ClosedLost">Closed Lost</option>
          </select>
        </div>
        <div>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Value ($)"
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div>
        <textarea
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 w-full text-white text-xl p-2 rounded-md"
      >
        Add Lead
      </button>
    </form>
  );
}
