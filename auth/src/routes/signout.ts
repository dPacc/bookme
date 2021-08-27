import express from "express";

const router = express.Router();

// Route
router.post("/api/users/signout", (req, res) => {
  // Signout user, delete cookie
  req.session = null;
  res.send({});
});

export { router as signoutRouter };
