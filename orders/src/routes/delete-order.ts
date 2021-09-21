import express, { Request, Response } from "express";

const router = express.Router();

// Delete an order
router.delete("/api/orders/:orderId", async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrderRouter };
