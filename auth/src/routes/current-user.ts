import express from "express";

const router = express.Router();


// Route
router.get("/api/users/currentuser", (req, res) => {
    res.send({
        user: "User"
    });
});

export { router as currentUserRouter };

