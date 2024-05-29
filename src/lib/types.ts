import { EventoEvent } from "@prisma/client";

export type EventoResponse = {
  totalCount: number;
  events: EventoEvent[];
};
