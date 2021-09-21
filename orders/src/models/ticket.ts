import mongoose from "mongoose";

// An interface that describes properties required to create a new ticket
interface TicketAttrs {
  title: string;
  price: number;
}

// An interface that describes properties that ticket document has
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
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

const Ticket = mongoose.model<TicketDoc, TicketModel>("Order", ticketSchema);

export { Ticket };
