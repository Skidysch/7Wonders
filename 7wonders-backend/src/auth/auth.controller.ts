import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from './jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() loginDto: LoginDto,
  ) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.authService.login(user);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'Logged in successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { accessToken } =
      await this.authService.refreshAccessToken(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return { message: 'Access token refreshed successfully' };
  }

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() registerDto: RegisterDto,
  ) {
    const tokens = await this.authService.register(registerDto);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'User successfully created' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Not logged in');
    }

    const payload = await this.authService.verifyRefreshToken(refreshToken);

    await this.authService.logout(payload.sub);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { message: 'Logged out successfully' };
  }
}
