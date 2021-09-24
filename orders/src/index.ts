import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";

const port = process.env.PORT || 3000;

// Check for JWT secret
if (!process.env.JWT_KEY) {
  throw new Error("JWT_KEY must be set");
}

// Check for orders MongoDB URI
if (!process.env.MONGO_URI) {
  throw new Error("ORDERS MONGO URI NOT SET!");
}

// Check for orders NATS Cluster ID
if (!process.env.NATS_CLUSTER_ID) {
  throw new Error("ORDERS MONGO URI NOT SET!");
}

// Check for orders NATS Client ID
if (!process.env.NATS_CLIENT_ID) {
  throw new Error("ORDERS MONGO URI NOT SET!");
}

// Check for orders NATS URL
if (!process.env.NATS_URL) {
  throw new Error("ORDERS MONGO URI NOT SET!");
}

// Connect to NATS
natsWrapper.connect(
  process.env.NATS_CLUSTER_ID,
  process.env.NATS_CLIENT_ID,
  process.env.NATS_URL
);

natsWrapper.client.on("close", () => {
  console.log("[Orders] NATS connection closed");
  process.exit();
});

// Listen to Ticket created and updated events
new TicketCreatedListener(natsWrapper.client).listen();
new TicketUpdatedListener(natsWrapper.client).listen();

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
  .then(() => console.log("[Orders] Connected to MongoDB"))
  .catch((err) => console.log(`[Orders] DB connection error - ${err}`));

// Run the server
app.listen(port, () => {
  console.log(`[Orders] Listening on port ${port}`);
});
