import { response } from "express";
import AppError from "../../errors/AppError";
import CheckContactOpenTickets from "../../helpers/CheckContactOpenTickets";
import SetTicketMessagesAsRead from "../../helpers/SetTicketMessagesAsRead";
import { getIO } from "../../libs/socket";
import Ticket from "../../models/Ticket";
import ShowTicketService from "./ShowTicketService";

interface TicketData {
  status?: string;
  userId?: number;
  queueId?: number;
}

interface Request {
  ticketData: TicketData;
  ticketId: string | number;
}

interface Response {
  ticket: Ticket;
  oldStatus: string;
  oldUserId: number | undefined;
}

let mutex = Promise.resolve() as unknown as Promise<Response>;

const AcceptTicketService = async ({
  ticketData,
  ticketId
}: Request): Promise<Response> => {
  mutex = mutex.then(async () => {
    const { status, userId, queueId } = ticketData;

    const ticket = await ShowTicketService(ticketId);

    await SetTicketMessagesAsRead(ticket);

    const oldStatus = ticket.status;
    const oldUserId = ticket.user?.id;

    if (oldStatus !== "pending") {
      throw new AppError("ERR_CANT_ACCEPT_TICKET");
    }

    await ticket.update({
      status,
      queueId,
      userId
    });

    await ticket.reload();

    const io = getIO();

    if (ticket.status !== oldStatus || ticket.user?.id !== oldUserId) {
      io.to(oldStatus).emit("ticket", {
        action: "delete",
        ticketId: ticket.id
      });
    }

    io.to(ticket.status)
      .to("notification")
      .to(ticketId.toString())
      .emit("ticket", {
        action: "update",
        ticket
      });

    return { ticket, oldStatus, oldUserId };
  });

  return mutex;
};

export default AcceptTicketService;
