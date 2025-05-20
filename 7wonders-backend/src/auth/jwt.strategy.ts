import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = req.cookies['accessToken'];
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, // Use the secret from the config service
    });
  }

  async validate(payload: any): Promise<Partial<User>> {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, refreshToken, ...safeUser } = user; // Exclude password and refresh token from the result
    return safeUser;
  }
}
