import mongoose from "mongoose";
import { OrderCancelledEvent } from "@netraga/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";

// Create a setup function to be called before each test
const setup = async () => {
  // Create a new listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // Create and save a ticket
  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });
  ticket.set({ orderId });
  await ticket.save();

  // Create a fake data object
  const data: OrderCancelledEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};

// Test update ticket, publish event, acks the message
it("updates the ticket, publishes event, and acks the message", async () => {
  // Setup
  const { listener, ticket, data, msg, orderId } = await setup();

  // Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // Find the ticket
  const updatedTicket = await Ticket.findById(ticket.id);

  // Assert ticket is updated
  expect(updatedTicket!.orderId).not.toBeDefined();

  // Assert ack is called
  expect(msg.ack).toHaveBeenCalled();

  // Assert event is published
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
