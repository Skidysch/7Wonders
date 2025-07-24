import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { GameState } from 'src/types/game.interface';

@Injectable()
export class GameStoreService {
  constructor(private redisService: RedisService) {}

  private getRedisKey(gameId: string): string {
    return `game:${gameId}`;
  }

  async getGame(gameId: string): Promise<GameState> {
    const client = this.redisService.getClient();
    const key = this.getRedisKey(gameId);
    const data = await client.get(key);

    if (!data) {
      throw new Error(`Game with ID ${gameId} not found in Redis`);
    }

    return JSON.parse(data) as GameState;
  }

  async saveGame(gameId: string, gameState: GameState): Promise<void> {
    const client = this.redisService.getClient();
    const key = this.getRedisKey(gameId);
    await client.set(key, JSON.stringify(gameState));
  }

  async deleteGame(gameId: string): Promise<void> {
    const client = this.redisService.getClient();
    const key = this.getRedisKey(gameId);
    await client.del(key);
  }

  async gameExists(gameId: string): Promise<boolean> {
    const client = this.redisService.getClient();
    const key = this.getRedisKey(gameId);
    return (await client.exists(key)) === 1;
  }
}
