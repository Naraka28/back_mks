import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tickets } from './entity/tickets.entity';
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
            const result = await this.ticketsRepository.find({relations: ['orders', 'cashier']});
            if (result.length === 0) {
            throw new NotFoundException('tickets not founded');
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Unexpected error fetching tickets');
        }
        }
    
    async findOne(id: number): Promise<Tickets | null> {
        try {
            const result= await this.ticketsRepository.findOne({
                where: { id },
                relations: ['orders', 'cashier'], // Incluye relaciones si es necesario
            });
            if (!result) {
                throw new NotFoundException(`Ticket with ID ${id} not found`);
            }
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(
                `Failed to retrieve ticket with ID ${id}`,
            );
        }
    }

    async createTicket(createTicket: CreateTicketDto): Promise<Tickets> {
        try {
            const { ticket_date, total, cashier, orders } = createTicket;
    
            // Buscar cajero
            const cashierCreate = await this.userRepository.findOne({ where: { id: cashier } });
            if (!cashierCreate) {
                throw new NotFoundException(`Cashier with ID ${cashier} not found`);
            }
    
            // Buscar órdenes
            const ordersCreate = await this.ordersRepository.find({ where: { id: In(orders) } });
            if (!ordersCreate.length) {
                throw new NotFoundException('Orders not found');
            }
    
            // Crear ticket correctamente
            const newTicket = new Tickets();
            newTicket.ticket_date = ticket_date;
            newTicket.total = total;
            newTicket.cashier = cashierCreate;
            newTicket.orders = ordersCreate;
    
            
            return await this.ticketsRepository.save(newTicket);
    
        } catch (error) {
            console.error('Error creating ticket:', error);
            throw new InternalServerErrorException(`Unexpected error at creating new ticket: ${error.message}`);
        }
    }


    async updateTicket(id: number, updateTicket: CreateTicketDto): Promise<Tickets | null> {
        try {
            const { ticket_date, total, cashier, orders } = updateTicket;
    
            // Buscar cajero
            const cashierUpdate = await this.userRepository.findOne({ where: { id: cashier } });
            if (!cashierUpdate) {
                throw new NotFoundException(`Cashier with ID ${cashier} not found`);
            }
    
            // Buscar órdenes
            const ordersUpdate = await this.ordersRepository.find({ where: { id: In(orders) } });
            if (!ordersUpdate.length) {
                throw new NotFoundException('Orders not found');
            }
    
            // Actualizar ticket correctamente
            const ticket = await this.ticketsRepository.findOne({ where: { id } });
            if (!ticket) {
                throw new NotFoundException(`Ticket with ID ${id} not found`);
            }
    
            ticket.ticket_date = ticket_date;
            ticket.total = total;
            ticket.cashier = cashierUpdate;
            ticket.orders = ordersUpdate;
    
            return await this.ticketsRepository.save(ticket);
        } catch (error) {
            console.error('Error updating ticket:', error);
            throw new InternalServerErrorException(`Unexpected error at updating ticket: ${error.message}`);
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
            throw new InternalServerErrorException(`Unexpected error at deleting ticket: ${error.message}`);
        }
    }

    async getTicketsByCashier(cashierId: number): Promise<Tickets[]> {
        try {
            const cashier = await this.userRepository.findOne({ where: { id: cashierId } });
            if (!cashier) {
                throw new NotFoundException(`Cashier with ID ${cashierId} not found`);
            }
    
            const tickets = await this.ticketsRepository.find({
                where: { cashier },
                relations: ['orders'],
                
            });
    
            if (tickets.length === 0) {
                throw new NotFoundException(`No tickets found for cashier ID ${cashierId}`);
            }
    
            return tickets;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            throw new InternalServerErrorException(`Unexpected error fetching tickets: ${error.message}`);
        }
    }

    async getTicketsByOrder(orderId: number): Promise<Tickets[]> {
        try {
            const order = await this.ordersRepository.findOne({ where: { id: orderId } });
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
            throw new InternalServerErrorException(`Unexpected error fetching tickets: ${error.message}`);
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
            throw new InternalServerErrorException(`Unexpected error fetching tickets: ${error.message}`);
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
            throw new InternalServerErrorException(`Unexpected error fetching tickets: ${error.message}`);
        }
    }

    async getTicketsByDateRange(from: Date, to: Date): Promise<Tickets[]> {
        throw new Error('Method not implemented.');
    }

    async getTicketsByCashierAndDate(cashierId: number, ticketDate: Date): Promise<Tickets[]> {
        throw new Error('Method not implemented.');
    }

    async getTicketsByCashierAndDateRange(cashierId: number, from: Date, to: Date): Promise<Tickets[]> {

        throw new Error('Method not implemented.');
    }

    async getTicketsByTotalRange(total: number): Promise<Tickets[]> {
        throw new Error('Method not implemented.');
    }

    async getTicketsByTotalRangeAndDate(total: number, ticketDate: Date): Promise<Tickets[]> {
        throw new Error('Method not implemented.');
    }








}
