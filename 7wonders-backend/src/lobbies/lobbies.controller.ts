import { Controller, Get, Post, Patch, Param, UseGuards } from '@nestjs/common';
import { LobbiesService } from './lobbies.service';
import { GameLobbyPreview } from 'src/types/lobby.interface';
import { GamesService } from 'src/games/games.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('lobby')
export class LobbiesController {
  constructor(
    private readonly lobbiesService: LobbiesService,
    private readonly gamesService: GamesService,
  ) {}

  @Get('/lobbies')
  async getActiveLobbies(): Promise<GameLobbyPreview[]> {
    return await this.gamesService.getActiveGamesWithLobbyInfo();
  }

  @Get(':gameId/players')
  async getLobbyPlayers(@Param('gameId') gameId: string) {
    return await this.lobbiesService.getLobbyPlayers(gameId);
  }

  @Post(':gameId/join')
  async addPlayerToLobby(
    @Param('gameId') gameId: string,
    @CurrentUser() user: any,
  ) {
    await this.lobbiesService.addPlayerToLobby(gameId, user.id);
    return { message: `Player ${user.id} joined lobby ${gameId}` };
  }

  @Post(':gameId/leave')
  async removePlayerFromLobby(
    @Param('gameId') gameId: string,
    @CurrentUser() user: any,
  ) {
    // TODO: consider adding type for user from payload
    await this.lobbiesService.removePlayerFromLobby(gameId, user.id);
    return { message: `Player ${user.id} left lobby ${gameId}` };
  }

  @Patch(':gameId/start')
  async startGame(@Param('gameId') gameId: string) {
    return await this.lobbiesService.startGame(gameId);
  }
}
