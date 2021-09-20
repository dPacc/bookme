import { Publisher, Subjects, TicketCreatedEvent } from "@netraga/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
