import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";

const port = process.env.PORT || 3000;

const start = async () => {
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

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("[Orders] NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("[Orders] Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  // Run the server
  app.listen(port, () => {
    console.log(`[Orders] Listening on port ${port}`);
  });
};

start();
