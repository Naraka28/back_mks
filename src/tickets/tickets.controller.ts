import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { create } from 'domain';
import { CreateTicketDto } from './dto/create-tickets.dto';
import { Tickets } from './entity/tickets.entity';

@Controller('tickets')
export class TicketsController {
    constructor(private ticketsService:TicketsService) {}

    @Get()
    async getTickets() {
        return this.ticketsService.findAll();
    }

    @Get(':id')
    async getTicket(id:number) {
        return this.ticketsService.findOne(id); 
    }

    @Get('cashier/:cashierId')
    async getTicketsByCashier(cashierId:number) {
        return this.ticketsService.getTicketsByCashier(cashierId);
    }

    @Get('orders/:orderId')
    async getTicketsByOrder(orderId:number) {
        return this.ticketsService.getTicketsByOrder(orderId);
    }

    @Get('date/:ticketDate')
    async getTicketsByDate(ticketDate:Date) {
        return this.ticketsService.getTicketsByDate(ticketDate);
    }

    @Get('today')
    async getTodayTickets() {
        return this.ticketsService.getTodayTickets();
    }

    @Get('last_month/')
    async getLastMonthTickets() {
        return this.ticketsService.getLastMonthTickets();
    }	

    @Get('last_week/')
    async getLastWeekTickets() {
        return this.ticketsService.getLastWeekTickets();
    }

    @Get('date_range/:from/:to')
    async getTicketsByDateRange(@Param('from') from: Date, @Param('to') to: Date) {
        return this.ticketsService.getTicketsByDateRange(from, to);
    }

    @Get('total/:min/:max')
    async getTicketsByTotalRange(@Param('min') min: number, @Param('max') max: number) {
        return this.ticketsService.getTicketsByTotalRange(min, max);
    }

    @Get('payment_method/:paymentMethod')
    async getTicketsByPaymentMethod(@Param('paymentMethod') paymentMethod: string) {
        return this.ticketsService.getTicketsByPaymentMethod(paymentMethod);
    }

    @Get('cashier/:cashierId/date/:ticketDate')
    async getTicketsByCashierAndDate(@Param('cashierId') cashierId: number, @Param('ticketDate') ticketDate: Date) {
        return this.ticketsService.getTicketsByCashierAndDate(cashierId, ticketDate);
    }
    @Get('cashier/:cashierId/date_range/:from/:to')
    async getTicketsByCashierAndDateRange(@Param('cashierId') cashierId: number, @Param('from') from: Date, @Param('to') to: Date) {
        return this.ticketsService.getTicketsByCashierAndDateRange(cashierId, from, to);
    }

    @Get('total/:min/:max/date_range/:from/:to')
    async getTicketsByTotalAndDateRange(@Param('min') min: number, @Param('max') max: number, @Param('from') from: Date, @Param('to') to: Date) {
        return this.ticketsService.getTicketsByTotalRangeAndDate(min, max, from,to);
    }


    @Post('create')
        async createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Tickets> {
            return this.ticketsService.createTicket(createTicketDto);
        }
    
    @Put(':id')
      async updateProduct(
          @Param('id', ParseIntPipe) id: number,   @Body() updateTicketDto: CreateTicketDto, ): Promise<Tickets | null> {
          return this.ticketsService.updateTicket(id, updateTicketDto);
      }

      @Delete(':id')
      async deleteProduct(
          @Param('id', ParseIntPipe) id: number,): Promise<{ message: string }> {
          return this.ticketsService.deleteTicket(id);
      }

     

}
