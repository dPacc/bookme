import { Publisher, Subjects, TicketUpdatedEvent } from "@netraga/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
