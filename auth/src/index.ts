import express from "express";

import { currentUserRouter } from "./routes/current-user";

// Create the app instance
const app = express();

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use(currentUserRouter);

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});