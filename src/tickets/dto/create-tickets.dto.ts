import { IsArray, IsDate, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { Orders } from 'src/orders/entity/orders.entity';
import { User } from 'src/users/entity/user.entity';

export class CreateTicketDto {
    @IsDate()
    ticket_date: Date;
    @IsInt()
    @IsPositive()
    total: number;
    @IsNumber()
    cashier: number;
    @IsArray()
    orders: number[];

    // @IsArray()
    // orders: number[];   
    
}
