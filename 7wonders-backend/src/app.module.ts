import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LobbiesModule } from './lobbies/lobbies.module';
import { RedisService } from './redis/redis.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    GamesModule,
    LobbiesModule,
    // ThrottlerModule limits the number of requests to the server
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    LobbiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    RedisService,
  ],
})
export class AppModule {}
