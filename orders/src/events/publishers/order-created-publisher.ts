import { Publisher, Subjects, OrderCreatedEvent } from "@netraga/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
