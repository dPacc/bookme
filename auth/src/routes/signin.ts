import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { Password } from "../utils/password";
import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@netraga/common";

const router = express.Router();

// Route
router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please enter your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user from DB
    const existingUser = await User.findOne({ email });

    // If user not found, throw error
    if (!existingUser) {
      throw new BadRequestError("User not found");
    }

    // Compare passwords
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    // If passwords don't match, throw error
    if (!passwordsMatch) {
      throw new BadRequestError("Invalid password");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );

    // Store JWT on session
    req.session = {
      jwt: userJwt,
    };

    return res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
