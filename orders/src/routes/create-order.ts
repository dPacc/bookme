import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@netraga/common";
import { body } from "express-validator";

const router = express.Router();

// Create an order
router.post(
  "/api/orders",
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Ticket ID must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as createOrderRouter };
