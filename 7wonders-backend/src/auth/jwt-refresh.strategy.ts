import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private usersService: UsersService,
    configService: ConfigService,
  ) {
    super(<StrategyOptionsWithRequest>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['refreshToken'],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<Partial<User>> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user.refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    const cookieToken = req.cookies?.['refreshToken'];

    const tokenIsMatch = await bcrypt.compare(cookieToken, user?.refreshToken);
    if (!tokenIsMatch) {
      throw new UnauthorizedException(
        'Refresh strategy: Invalid refresh token',
      );
    }

    const { password, refreshToken, ...safeUser } = user;
    return safeUser;
  }
}
