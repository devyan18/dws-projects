import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = (await this.userService.findByCredentials(
      loginUserDto,
    )) as UserDocument;

    const payload = { userId: user._id };

    const { _id, email, username, isPremium } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user_data: { _id, email, username, isPremium },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const payload = { userId: user._id };

    const { _id, email, username, isPremium } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user_data: { _id, email, username, isPremium },
    };
  }
}
