import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';
import { Orders } from 'src/orders/entity/orders.entity';
import { User } from 'src/users/entity/user.entity';

export class CreateTicketDto {
    @IsDate()
    ticket_date: Date;
    @IsString()
    ticket_time: string;
    @IsInt()
    @IsPositive()
    total: number;
    @IsNumber()
    @IsPositive()
    @IsInt()
    cashier: number;
    @IsArray()
    @IsNumber({}, { each: true })
    @IsPositive({ each: true })
    orders: number[];
    @IsString()
    payment_method: string;




}
