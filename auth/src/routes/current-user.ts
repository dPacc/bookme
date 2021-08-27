import express from "express";
import jwt from "jsonwebtoken";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

// Route
router.get("/api/users/currentuser", (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
