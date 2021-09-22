import { Publisher, Subjects, OrderCancelledEvent } from "@netraga/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
