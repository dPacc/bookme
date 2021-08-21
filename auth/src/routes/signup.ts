import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();


// Route
router.get("/api/users/signup", [
    body('email')
    .isEmail()
    .withMessage('Invalid email'),
    body('password')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password must be between 6 and 20 characters')
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating a user")


    res.send({
        user: "User created"
    });
});

export { router as signupRouter };

