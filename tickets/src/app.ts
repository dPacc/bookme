import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@netraga/common";

import { createTicketRouter } from "./routes/create-ticket";
import { getTicketRouter } from "./routes/get-ticket";
import { getTicketsRouter } from "./routes/get-tickets";
import { updateTicketRouter } from "./routes/update-ticket";

// Create the app instance
const app = express();

// Middlewares
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

// Routes
app.use(createTicketRouter);
app.use(getTicketRouter);
app.use(getTicketsRouter);
app.use(updateTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(errorHandler);

export { app };
