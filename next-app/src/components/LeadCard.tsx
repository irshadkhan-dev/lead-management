"use client";

import { Leads } from "@/types";
import { formatDistance } from "date-fns";

interface LeadCardProps {
  lead: Leads;
}

const statusColors = {
  New: "bg-blue-500",
  Engaged: "bg-yellow-500",
  ProposalSent: "bg-purple-500",
  ClosedWon: "bg-green-500",
  ClosedLost: "bg-red-500",
};

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between pb-2">
          <div>
            <h3 className="font-semibold text-lg">{lead.name}</h3>
            <span className="text-sm">{lead.email}</span>
          </div>
          <span
            className={`${
              statusColors[lead.status]
            } text-white px-3 py-1 rounded-full text-sm`}
          >
            {lead.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Value:</span>
            <span className="font-medium">${lead.value.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Created:</span>
            <span className="text-sm">
              {formatDistance(lead.createdAt, new Date(), { addSuffix: true })}
            </span>
          </div>
          {lead.notes && (
            <p className="text-sm text-gray-600 mt-2">{lead.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
