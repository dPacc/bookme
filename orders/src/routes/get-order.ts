import express, { Request, Response } from "express";

const router = express.Router();

// Get an order by ID
router.get("/api/orders/:orderId", async (req: Request, res: Response) => {
  res.send({});
});

export { router as getOrderRouter };
