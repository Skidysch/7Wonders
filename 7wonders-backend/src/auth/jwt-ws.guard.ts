import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const cookies = client.handshake.headers.cookie;
    if (!cookies) {
      throw new UnauthorizedException('No cookies provided');
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies['accessToken']; // Access the accessToken cookie

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      (client as any).user = payload; // Attach user to socket for later use
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
