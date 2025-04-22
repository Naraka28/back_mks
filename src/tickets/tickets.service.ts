import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, MoreThanOrEqual, Repository } from 'typeorm';
import { Tickets, TicketStatus } from './entity/tickets.entity';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { Orders } from 'src/orders/entity/orders.entity';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets) private ticketsRepository: Repository<Tickets>,
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Tickets[]> {
    try {
      const result = await this.ticketsRepository.find({
        relations: ['orders', 'cashier'],
      });
      if (result.length === 0) {
        throw new NotFoundException('tickets not founded');
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unexpected error fetching tickets',
      );
    }
  }

  async findOne(id: number): Promise<Tickets | null> {
    try {
      const result = await this.ticketsRepository.findOne({
        where: { id },
        relations: ['orders', 'cashier'], // Incluye relaciones si es necesario
      });
      if (!result) {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve ticket with ID ${id}`,
      );
    }
  }

  async createTicket(createTicket: CreateTicketDto): Promise<Tickets> {
    try {
      const { payment_method, total, cashier, orders } = createTicket;

      // Buscar cajero
      const cashierCreate = await this.userRepository.findOne({
        where: { id: cashier },
      });
      if (!cashierCreate) {
        throw new NotFoundException(`Cashier with ID ${cashier} not found`);
      }

      // Buscar órdenes
      const ordersCreate = await this.ordersRepository.find({
        where: { id: In(orders) },
      });
      if (!ordersCreate.length) {
        throw new NotFoundException('Orders not found');
      }

      // Crear ticket correctamente
      const newTicket = new Tickets();
      newTicket.total = total;
      newTicket.cashier = cashierCreate;
      newTicket.orders = ordersCreate;
      newTicket.payment_method = payment_method;

      return await this.ticketsRepository.save(newTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error at creating new ticket: ${error.message}`,
      );
    }
  }

  async updateTicket(
    id: number,
    updateTicket: CreateTicketDto,
  ): Promise<Tickets | null> {
    try {
      const {
        payment_method,
        ticket_time,
        ticket_date,
        total,
        cashier,
        orders,
      } = updateTicket;

      // Buscar cajero
      const cashierUpdate = await this.userRepository.findOne({
        where: { id: cashier },
      });
      if (!cashierUpdate) {
        throw new NotFoundException(`Cashier with ID ${cashier} not found`);
      }

      // Buscar órdenes
      const ordersUpdate = await this.ordersRepository.find({
        where: { id: In(orders) },
      });
      if (!ordersUpdate.length) {
        throw new NotFoundException('Orders not found');
      }

      // Actualizar ticket correctamente
      const ticket = await this.ticketsRepository.findOne({ where: { id } });
      if (!ticket) {
        throw new NotFoundException(`Ticket with ID ${id} not found`);
      }

      ticket.ticket_date = ticket_date;
      ticket.ticket_time = ticket_time;
      ticket.total = total;
      ticket.cashier = cashierUpdate;
      ticket.orders = ordersUpdate;
      ticket.payment_method = payment_method;

      return await this.ticketsRepository.save(ticket);
    } catch (error) {
      console.error('Error updating ticket:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error at updating ticket: ${error.message}`,
      );
    }
  }

  async deleteTicket(id: number): Promise<{ message: string }> {
    try {
      const result = await this.ticketsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Couldnt delete ticket with id ${id}`);
      }
      return { message: 'Ticket deleted successfully' };
    } catch (error) {
      console.error('Error deleting ticket:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error at deleting ticket: ${error.message}`,
      );
    }
  }

  async getTicketsByCashier(cashierId: number): Promise<Tickets[]> {
    try {
      const cashier = await this.userRepository.findOne({
        where: { id: cashierId },
      });
      if (!cashier) {
        throw new NotFoundException(`Cashier with ID ${cashierId} not found`);
      }

      const tickets = await this.ticketsRepository.find({
        where: { cashier },
        relations: ['orders'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found for cashier ID ${cashierId}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByOrder(orderId: number): Promise<Tickets[]> {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id: orderId },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      const tickets = await this.ticketsRepository.find({
        where: { orders: [order] },
        relations: ['orders'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(`No tickets found for order ID ${orderId}`);
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByDate(ticketDate: Date): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository.find({
        where: { ticket_date: ticketDate },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(`No tickets found for date ${ticketDate}`);
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTodayTickets(): Promise<Tickets[]> {
    try {
      const today = new Date();

      const tickets = await this.ticketsRepository.find({
        where: { ticket_date: today },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException('No tickets found for today');
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getLastMonthTickets(): Promise<Tickets[]> {
    try {
      const today = new Date();
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate(),
      );

      const tickets = await this.ticketsRepository.find({
        where: { ticket_date: Between(today, lastMonth) },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException('No tickets found for last month');
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getLastWeekTickets(): Promise<Tickets[]> {
    try {
      const today = new Date();
      const lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7,
      );

      const tickets = await this.ticketsRepository.find({
        where: { ticket_date: Between(today, lastWeek) },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException('No tickets found for last week');
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByDateRange(from: Date, to: Date): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository.find({
        where: { ticket_date: Between(from, to) },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found between ${from} and ${to}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByCashierAndDate(
    cashierId: number,
    ticketDate: Date,
  ): Promise<Tickets[]> {
    try {
      const cashier = await this.userRepository.findOne({
        where: { id: cashierId },
      });
      if (!cashier) {
        throw new NotFoundException(`Cashier with ID ${cashierId} not found`);
      }

      const tickets = await this.ticketsRepository.find({
        where: { cashier, ticket_date: ticketDate },
        relations: ['orders'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found for cashier ID ${cashierId} on date ${ticketDate}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByCashierAndDateRange(
    cashierId: number,
    from: Date,
    to: Date,
  ): Promise<Tickets[]> {
    try {
      const cashier = await this.userRepository.findOne({
        where: { id: cashierId },
      });
      if (!cashier) {
        throw new NotFoundException(`Cashier with ID ${cashierId} not found`);
      }

      const tickets = await this.ticketsRepository.find({
        where: { cashier, ticket_date: Between(from, to) },
        relations: ['orders'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found for cashier ID ${cashierId} between ${from} and ${to}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByTotalRange(
    totalMin: number,
    totalMax: number,
  ): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository.find({
        where: { total: Between(totalMin, totalMax) },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found with total between ${totalMin} and ${totalMax}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByTotalRangeAndDate(
    totalMin: number,
    totalMax: number,
    from: Date,
    to: Date,
  ): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository.find({
        where: {
          total: Between(totalMin, totalMax),
          ticket_date: Between(from, to),
        },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found with total between ${totalMin} and ${totalMax} and date between ${from} and ${to}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTicketsByPaymentMethod(paymentMethod: string): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository.find({
        where: { payment_method: paymentMethod },
        relations: ['orders', 'cashier'],
      });

      if (tickets.length === 0) {
        throw new NotFoundException(
          `No tickets found with payment method ${paymentMethod}`,
        );
      }

      return tickets;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTodayPendingTickets(): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository
        .createQueryBuilder('tickets')
        .where('tickets.status = :status', { status: TicketStatus.PENDIENTE })
        .andWhere('tickets.ticket_date >= CURRENT_DATE')
        .getMany();
      if (tickets.length === 0)
        throw new NotFoundException(`Theres no pending tickets`);
      return tickets;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Unexpected error fetching tickets: ${error.message}`,
      );
    }
  }

  async getTodayCompletedTickets(): Promise<Tickets[]> {
    try {
      const tickets = await this.ticketsRepository
        .createQueryBuilder('tickets')
        .where('tickets.status = :status', { status: TicketStatus.COMPLETADO })
        .andWhere('tickets.ticket_date >= CURRENT_DATE')
        .getMany();

      if (tickets.length === 0)
        throw new NotFoundException(`Theres no completed tickets`);

      return tickets;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Unexpected error fetching completed tickets`,
      );
    }
  }
}
