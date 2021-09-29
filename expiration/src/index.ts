import { natsWrapper } from "./nats-wrapper";

const port = process.env.PORT || 3000;

const start = async () => {
  // Check for tickets NATS Cluster ID
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("TICKETS MONGO URI NOT SET!");
  }

  // Check for tickets NATS Client ID
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("TICKETS MONGO URI NOT SET!");
  }

  // Check for tickets NATS URL
  if (!process.env.NATS_URL) {
    throw new Error("TICKETS MONGO URI NOT SET!");
  }

  try {
    // Connect to NATS
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("[Tickets] NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => {
      natsWrapper.client.close();
    });

    process.on("SIGTERM", () => {
      natsWrapper.client.close();
    });
  } catch (err) {
    console.error(err);
  }
};

start();
