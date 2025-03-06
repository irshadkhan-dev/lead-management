import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { db } from "./db/index";
import { LeadInputValidator } from "./types/type";

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get("/lead", async (req: Request, res: Response) => {
  const data = await db.leads.findMany();
  res.json(data);
});

app.post("/lead", async (req: Request, res: Response) => {
  try {
    const newLead = await req.body.newLead;
    console.log(newLead);

    const validationResult = LeadInputValidator.safeParse(newLead);
    console.log(validationResult);

    if (!validationResult.success) {
      console.error("Validation error", validationResult.error);
      res.status(400).json({
        success: false,
        message: "Validation failed",
      });
    }

    await db.leads.create({
      data: { ...validationResult.data! },
    });

    res.json({
      success: true,
      message: "Lead created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: "An unknown error occurred",
    });
  }
});

app.listen(3001, () => {
  console.log("The server is runnnng on port", PORT);
});
