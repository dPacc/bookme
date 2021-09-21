import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";

// An interface that describes properties required to create a new ticket
interface TicketAttrs {
  title: string;
  price: number;
}

// An interface that describes properties that ticket document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isReserved(): Promise<Boolean>;
}

// An interface that describes properties that ticket model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function () {
  // Run query to look at all orders, find order where the
  // ticket is the one we just found and the order status is not cancelled
  // If we find an order from that, means the ticket is reserved
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Order", ticketSchema);

export { Ticket };
