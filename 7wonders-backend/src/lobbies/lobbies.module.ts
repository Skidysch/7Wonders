import { forwardRef, Module } from '@nestjs/common';
import { LobbiesController } from './lobbies.controller';
import { RedisModule } from 'src/redis/redis.module';
import { LobbiesService } from './lobbies.service';
import { GamesModule } from 'src/games/games.module'

@Module({
  imports: [forwardRef(() => GamesModule), RedisModule],
  controllers: [LobbiesController],
  providers: [LobbiesService],
  exports: [LobbiesService],
})
export class LobbiesModule {}
