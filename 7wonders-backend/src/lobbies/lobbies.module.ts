import { forwardRef, Module } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { LobbiesController } from './lobbies.controller';
import { LobbiesService } from './lobbies.service';
import { GamesModule } from 'src/games/games.module'

@Module({
  imports: [forwardRef(() => GamesModule)],
  controllers: [LobbiesController],
  providers: [LobbiesService, RedisService],
  exports: [LobbiesService],
})
export class LobbiesModule {}
