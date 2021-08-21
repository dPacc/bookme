import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from './middlewares/error-handler';


// Create the app instance
const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// Error handler middleware
app.use(errorHandler);

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}!!!`)
});