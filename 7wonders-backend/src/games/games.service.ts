import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LobbiesService } from 'src/lobbies/lobbies.service';
import { LobbyPlayer } from 'src/types/lobby-player.interface';

@Injectable()
export class GamesService {
  constructor(
    private readonly databaseService: DatabaseService,
    @Inject(forwardRef(() => LobbiesService))
    private readonly lobbyService: LobbiesService,
  ) {}

  // TODO: Consider creating a game only if user is authenticated
  async create(createGameDto: Prisma.GameCreateInput) {
    const game = await this.databaseService.game.create({
      data: createGameDto,
    });

    // Add the host to the lobby
    await this.lobbyService.addPlayer(game.id, game.hostedById as string);

    return game;
  }

  async findAll() {
    return this.databaseService.game.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.game.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          players: true,
        },
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async update(id: string, updateGameDto: Prisma.GameUpdateInput) {
    try {
      return await this.databaseService.game.update({
        where: {
          id,
        },
        data: updateGameDto,
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.game.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException('Game not found');
    }
  }

  async updateGamePlayers(id: string, players: LobbyPlayer[]) {
    try {
      return await this.databaseService.gamePlayer.createMany({
        data: players.map((player) => ({
          gameId: id,
          userId: player.userId,
          faction: player.faction,
          factionSide: player.factionSide,
        })),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update game players: ${error.message}`);
      }
      throw new Error('Failed to update game players: Unknown error');
    }
  }

  // TODO: Handle host leaving game (e.g. transfer host to another player)
}
  