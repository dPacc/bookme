import express, { Request, Response } from "express";
import { requireAuth } from "@netraga/common";

const router = express.Router();

// Route
router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
