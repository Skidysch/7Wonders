import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Prisma, User } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: Request,
    @Body(ValidationPipe) createGameDto: CreateGameDto,
  ) {
    const user = req.user;
    if (!user) {
      throw new Error('User not found');
    }
    const createGameData: Prisma.GameCreateInput = createGameDto;
    return this.gamesService.create({
      ...createGameData,
      hostedBy: {
        connect: {
          id: user.id,
        },
      },
    });
  }

  @Get()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateGameDto: UpdateGameDto,
  ) {
    const updateGameData: Prisma.GameUpdateInput = updateGameDto;
    return this.gamesService.update(id, updateGameData);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
