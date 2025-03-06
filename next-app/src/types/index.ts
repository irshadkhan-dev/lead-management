export type LeadStatus =
  | "New"
  | "Engaged"
  | "ProposalSent"
  | "ClosedWon"
  | "ClosedLost";

export type Leads = {
  id: string;
  name: string;
  email: string;
  status: LeadStatus;
  value: number;
  notes: string;
  createdAt: Date;
};
