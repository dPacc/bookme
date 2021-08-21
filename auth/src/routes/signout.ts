import express from "express";

const router = express.Router();


// Route
router.post("/api/users/signout", (req, res) => {
    res.send({
        user: "User"
    });
});

export { router as signoutRouter };

