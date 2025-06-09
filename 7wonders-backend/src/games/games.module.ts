import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module';
import { AuthModule } from 'src/auth/auth.module';
import { GamesEngineService } from '../engine/games-engine.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => LobbiesModule), AuthModule],
  controllers: [GamesController],
  providers: [GamesService, GamesEngineService],
  exports: [GamesService, GamesEngineService],
})
export class GamesModule {}
