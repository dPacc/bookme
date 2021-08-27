import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Route
router.get("/api/users/currentuser", (req, res) => {
  // Check if jwt is present in session cookie
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  // Check if the jwt is valid
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    return res.send({ currentUser: payload });
  } catch (error) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
