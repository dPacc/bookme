import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@netraga/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findById(data.id);

    // If ticket is not found, throw an error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Update ticket
    ticket.set({
      title: data.title,
      price: data.price,
    });

    // Save ticket
    await ticket.save();

    // Acknowledge message
    msg.ack();
  }
}
