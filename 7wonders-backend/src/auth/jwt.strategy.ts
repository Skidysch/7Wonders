import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
	
  }

  async validate(payload: any) {
	const user = await this.usersService.findOneByEmail(payload.email);
	if (!user) {
	  throw new NotFoundException('User not found');
	}
	const { password, refreshToken, ...result } = user; // Exclude password from the result
	return result;
  }
}
