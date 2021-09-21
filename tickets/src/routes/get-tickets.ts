import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@netraga/common";

const router = express.Router();

// Get all tickets
router.get("/api/tickets", async (req: Request, res: Response) => {
  const ticket = await Ticket.find({});

  // If ticket not found throw error
  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as getTicketsRouter };
