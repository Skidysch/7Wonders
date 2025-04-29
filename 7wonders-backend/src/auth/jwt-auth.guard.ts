import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

	// Trying to activate the standard JWT check
    const can = (await super.canActivate(context)) as boolean;
    if (!can) return false;

    const user = request.user as { id: string };

	// Checking the refreshToken in the database — if null, the user has logged out
    const userInDb = await this.usersService.findOne(user.id);
    if (!userInDb.refreshToken) {
      throw new UnauthorizedException('Access denied: token was invalidated');
    }

    return true;
  }
}
