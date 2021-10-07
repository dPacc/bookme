import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@netraga/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";

// Create the setup function
export const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: "asdf",
    userId: "asdf",
    status: OrderStatus.Created,
    ticket: {
      id: "asdf",
      price: 10,
    },
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

// Test replicates the order info
it("replicates the order info", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function
  await listener.onMessage(data, msg);

  // Write assertions to make sure that the correct data was replicated
  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

// Test acknowledges the message
it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function
  await listener.onMessage(data, msg);

  // Write assertions to make sure that the message was acknowledged
  expect(msg.ack).toHaveBeenCalled();
});
