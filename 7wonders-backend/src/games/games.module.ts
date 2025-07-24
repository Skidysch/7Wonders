import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';
import { AuthModule } from 'src/auth/auth.module';
import { GameEngineService } from '../engine/game-engine.service';
import { GameStoreService } from 'src/engine/games-store.service';
import { RedisModule } from 'src/redis/redis.module';
import { GameGateway } from 'src/engine/game.gateway';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => LobbiesModule),
    AuthModule,
    RedisModule,
  ],
  controllers: [GamesController],
  providers: [GamesService, GameEngineService, GameStoreService, GameGateway],
  exports: [GamesService, GameEngineService],
})
export class GamesModule {}
