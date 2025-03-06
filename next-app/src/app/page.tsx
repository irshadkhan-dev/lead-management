"use client";

import { useState } from "react";

import { Loader2, PlusCircle } from "lucide-react";
import { Leads, LeadStatus } from "@/types";
import { LeadCard } from "@/components/LeadCard";
import { Modal } from "@/components/Modal";
import { LeadForm } from "@/components/LeadForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<LeadStatus>("New");

  const statuses: LeadStatus[] = [
    "New",
    "Engaged",
    "ProposalSent",
    "ClosedWon",
    "ClosedLost",
  ];

  const {
    data: leads,
    isError,
    isLoading,
  } = useQuery<Leads[]>({
    queryKey: ["allLeads"],
    queryFn: async () => {
      const response = await axios.get(
        "https://lead-management-nq9q.onrender.com/lead"
      );
      return response.data;
    },
    staleTime: Infinity,
  });

  const handleAddLead = async (newLead: Omit<Leads, "id" | "createdAt">) => {
    const addLead = await axios.post(
      "https://lead-management-nq9q.onrender.com/lead",
      {
        newLead,
      }
    );

    if (addLead.data.success) {
      await queryClient.invalidateQueries({ queryKey: ["allLeads"] });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Lead Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-blue-600 text-white text-sm md:text-xl p-2 rounded-2xl"
          >
            <PlusCircle className="mr-2 h-4 w-4 shrink-0" />
            Add New Lead
          </button>
        </div>

        <div className="space-y-6">
          <div className="  w-full bg-gray-100 flex flex-wrap gap-2 p-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {leads
              ?.filter((lead) => lead.status === activeStatus)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
          </div>

          {leads &&
            leads?.filter((lead) => lead.status === activeStatus).length ===
              0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No leads in {activeStatus} status
                </p>
              </div>
            )}
          {isLoading && (
            <div className="text-center py-12 flex items-center justify-center">
              <div className="flex items-center">
                <Loader2 className="animate-spin h-9 w-9 text-gray-950" />
                <p className="text-gray-500">Loading Leads</p>
              </div>
            </div>
          )}
          {isError && (
            <div className="text-center py-12">
              <p className="text-gray-500">Failed to load leads</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Lead"
      >
        <LeadForm onSubmit={handleAddLead} />
      </Modal>
    </div>
  );
}
