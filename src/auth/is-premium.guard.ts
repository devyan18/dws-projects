import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class IsPremiumGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request?.user) {
      return false;
    }

    return await this.userService.isPremium(request.user._id);
  }
}
