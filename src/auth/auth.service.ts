import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  saltOrRounds: number = 10;

  async singUp(user: CreateUserDto): Promise<{ access_token: string }> {
    let spicePassword = user.password + process.env.PEPPER;
    const hashPass = await bcrypt.hash(spicePassword, this.saltOrRounds);

    let data = { ...user, password: hashPass };

    const newUser = await this.usersService.createUser(data);
    const payload = { sub: newUser.id, username: newUser.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
  async logIn(user: AuthDto): Promise<{ access_token: string }> {
    try {
      const cashierMatched = await this.usersService.findByEmail(user.email);

      let spicePassword = user.password + process.env.PEPPER;

      const isMatch = bcrypt.compare(spicePassword, cashierMatched.password);

      if (!isMatch) {
        throw new UnauthorizedException('');
      }

      const payload = { sub: cashierMatched.id, username: cashierMatched.name };

      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      throw new InternalServerErrorException('');
    }
  }
}
