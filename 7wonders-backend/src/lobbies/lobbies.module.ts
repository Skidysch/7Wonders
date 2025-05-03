import { forwardRef, Module } from '@nestjs/common';
import { LobbiesController } from './lobbies.controller';
import { RedisModule } from 'src/redis/redis.module';
import { LobbiesService } from './lobbies.service';
import { GamesModule } from 'src/games/games.module';
import { LobbiesGateway } from './lobbies.gateway';
import { JwtWsGuard } from 'src/auth/jwt-ws.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => GamesModule), AuthModule, RedisModule],
  controllers: [LobbiesController],
  providers: [LobbiesService, LobbiesGateway, JwtWsGuard],
  exports: [LobbiesService],
})
export class LobbiesModule {}
