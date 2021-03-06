import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
} from "@netraga/common";
import { Order } from "../models/order";

const router = express.Router();

router.post(
  "/api/payments",

  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  (req: Request, res: Response) => {
    res.send({
      message: "Charge successful",
    });
  }
);

export { router as createChargeRouter };
