import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const port = process.env.PORT || 3000;

// Check for JWT secret
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be set");
}

// Check for tickets MongoDB URI
if (!process.env.MONGO_URI) {
  throw new Error("TICKETS MONGO URI NOT SET!");
}
// Connect to NATS
natsWrapper.connect("bookme", "asdeasd", "http://nats-srv:4222");
natsWrapper.client.on("close", () => {
  console.log("NATS connection closed");
  process.exit();
});

process.on("SIGINT", () => {
  natsWrapper.client.close();
});

process.on("SIGTERM", () => {
  natsWrapper.client.close();
});

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));

// Run the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
