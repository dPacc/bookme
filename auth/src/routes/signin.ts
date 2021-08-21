import express from "express";

const router = express.Router();


// Route
router.post("/api/users/signin", (req, res) => {
    res.send({
        user: "User"
    });
});

export { router as signinRouter };

