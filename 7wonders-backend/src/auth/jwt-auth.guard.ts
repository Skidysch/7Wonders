import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) {
      throw new UnauthorizedException('No cookies');
    }

    const cookies = cookie.parse(cookieHeader);
    const token = cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException('No access token');
    }

    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOneByEmail(payload.email);
       const { password, refreshToken, ...safeUser } = user;
      request.user = safeUser; // attach decoded user to request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Auth guard error: Invalid token');
    }
  }
}
