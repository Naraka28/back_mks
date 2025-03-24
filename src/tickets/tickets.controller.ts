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


    // @Get('total/:total')
    // async getTicketsByTotal(total:number) {
    //     return this.ticketsService.getTicketsByTotalRange(total);
    // }

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
