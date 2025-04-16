import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { Faction, FactionSide } from 'src/types/faction.enum';

@Controller('lobby')
export class LobbiesController {
  constructor(private readonly lobbiesService: LobbiesService) {}

  @Get(':gameId/players')
  async getLobbyPlayers(@Param('gameId') gameId: string) {
    return await this.lobbiesService.getLobbyPlayers(gameId);
  }


  // TODO: If we change the logic of joining the lobby, we may keep the faction in the body.
  @Post(':gameId/join')
  async addPlayer(
    @Param('gameId') gameId: string,
    @Body('userId') userId: string,
  ) {
    await this.lobbiesService.addPlayer(gameId, userId);
    return { message: `Player ${userId} joined lobby ${gameId}` };
  }

  @Delete(':gameId/leave/:userId')
  async removePlayer(
    @Param('gameId') gameId: string,
    @Param('userId') userId: string,
  ) {
    await this.lobbiesService.removePlayer(gameId, userId);
    return { message: `Player ${userId} left lobby ${gameId}` };
  }

  @Patch(':gameId/start')
  async startGame(@Param('gameId') gameId: string) {
    return await this.lobbiesService.startGame(gameId);
  }
}
