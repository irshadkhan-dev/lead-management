import z from "zod";

export const LeadInputValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  value: z.number(),
  notes: z.string().optional(),
  status: z.enum(["New", "Engaged", "ProposalSent", "ClosedWon", "ClosedLost"]),
});
