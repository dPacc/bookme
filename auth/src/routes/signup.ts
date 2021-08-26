import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "./../errors/bad-request-error";

const router = express.Router();

// Route
router.post(
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
      throw new BadRequestError("Email already exists");
    }

    // Create new user and save to db
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      "0f9ba4a7be209164435ae4c34105a15d3b4dbb69f72c9a10cb4dfb47032c29d531d1c4854b7e70d932fc6ee512cd87ddf045c0d930c2bc9f6a229bb35740304c"
    );

    // Store JWT on session
    req.session = {
      jwt: userJwt,
    };

    return res.status(201).send(user);
  }
);

export { router as signupRouter };
