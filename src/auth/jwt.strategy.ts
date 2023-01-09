import { HttpException, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import environments from 'src/config/environments';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: environments().crypt.jwtSecret,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.userId);
    if (!user) {
      throw new HttpException('Invalid token', 401);
    }

    return user;
  }
}
