import express, { Request, Response } from "express";
import { User } from "../models/user";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

// Route
router.get(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    // If there are any errors, return them
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // Check if email already exists
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({});
    }

    // Create new user and save to db
    const user = User.build({ email, password });
    await user.save();

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
