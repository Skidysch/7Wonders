import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

// TODO: implement redirect to  login page in frontend if refresh token is expired | invalidated
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Exclude password from the result
      return result;
    }
    return null;
  }

  async login(user: any) {
    return await this.generateTokens(user.id, user.email);
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new Error('User registration failed');
    }
    return await this.login(newUser); // Automatically log in the user after registration
  }

  async generateTokens(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(userId, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { accessToken };
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }
  }

  async refreshAccessToken( refreshToken: string) {
    // 1. Verify the refresh token
    const payload = await this.verifyRefreshToken(refreshToken);

    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.refreshToken) {
      throw new NotFoundException('Refresh token not found');
    }

    // 2. Check if the refresh token in the database matches the one in the payload
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token mismatch');
    }

    return await this.generateAccessToken(user.id, user.email);
  }

  async logout(userId: string): Promise<void> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.updateRefreshToken(userId, null);
  }
}
