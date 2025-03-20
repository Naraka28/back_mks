import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import { RoleList } from '../entity/roles.entity';

export class CreateRolesDto {
  @IsEnum(RoleList, {
    message: 'Role must be a valid value like: admin, cashier, client',
  })
  role: RoleList;
}
