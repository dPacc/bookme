import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@netraga/common";

const router = express.Router();

// Get a ticket by ID
router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  // If ticket not found throw error
  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as getTicketRouter };
