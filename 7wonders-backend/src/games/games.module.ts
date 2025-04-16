import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LobbiesModule } from 'src/lobbies/lobbies.module'

@Module({
  imports: [DatabaseModule, forwardRef(() => LobbiesModule)],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
