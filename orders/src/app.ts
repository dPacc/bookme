import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@netraga/common";

import { createOrderRouter } from "./routes/create-order";
import { getOrderRouter } from "./routes/get-order";
import { getOrdersRouter } from "./routes/get-orders";
import { deleteOrderRouter } from "./routes/delete-order";

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
app.use(createOrderRouter);
app.use(getOrderRouter);
app.use(getOrdersRouter);
app.use(deleteOrderRouter);

app.all("*", () => {
  throw new NotFoundError();
});

// Error handler middleware
app.use(errorHandler);

export { app };
