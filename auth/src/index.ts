import mongoose from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 3000;

// Check for JWT secret
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be set");
}

// Check for auth MongoDB URI
if (!process.env.MONGO_URI) {
  throw new Error("AUTH MONGO URI NOT SET!");
}

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[Auth] Connected to MongoDB"))
  .catch((err) => console.log(`[Auth] DB connection error - ${err}`));

// Run the server
app.listen(port, () => {
  console.log(`[Auth] Listening on port ${port}`);
});
