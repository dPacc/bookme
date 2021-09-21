import express, { Request, Response } from "express";

const router = express.Router();

// Get all orders
router.get("/api/orders", async (req: Request, res: Response) => {
  res.send({});
});

export { router as getOrdersRouter };
