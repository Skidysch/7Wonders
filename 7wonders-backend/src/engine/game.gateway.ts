import * as cookie from 'cookie';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameState } from 'src/types/game.interface';
import { GameStoreService } from './games-store.service';

@WebSocketGateway({ cors: true })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly gameStore: GameStoreService,
  ) {}

  async handleConnection(client: any) {
    try {
      const cookieHeader = client.handshake.headers.cookie;
      if (!cookieHeader) throw new Error('Missing cookie header');

      const cookies = cookie.parse(cookieHeader);
      const token = cookies['accessToken']; // Replace with your token name

      if (!token) throw new Error('Missing token');

      const payload = this.jwtService.verify(token);
      client.data.userId = payload.sub; // Or payload.id depending on your JWT

      console.log(`Client ${client.id} connected as user ${payload.sub}`);
    } catch (err) {
      console.error(`Socket connection rejected: ${err.message}`);
      client.disconnect(); // Disconnect if token is invalid or missing
    }
  }

  sendGameStateToPlayers(gameId: string, gameState: GameState) {
    this.server.to(gameId).emit('game_state', gameState);
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() gameId: string,
    @ConnectedSocket() client: any,
  ) {
    const userId = client.data.userId;
    if (!userId) {
      client.emit('error', 'You must be authenticated to join a room');
      return;
    }

    const players = await this.gameStore.getGame(gameId).then((gameState) => {
      return Object.keys(gameState.players);
    });

    const isPlayerInLobby = players.some((id) => id === userId);

    if (!isPlayerInLobby) {
      client.emit('error', 'Access denied: not in lobby');
      console.warn(
        `User ${userId} tried to join game ${gameId} without being in the lobby`,
      );
      return;
    }

    client.join(gameId);
    console.log(`Client ${client.id} joined room ${gameId}`);

    const gameState = await this.gameStore.getGame(gameId);
    if (gameState) {
      this.server.to(gameId).emit('game_state', gameState);
    } else {
      client.emit('error', 'Game not found');
    }
  }

  @SubscribeMessage('leave_room')
  handleLeaveRoom(
    @MessageBody() gameId: string,
    @ConnectedSocket() client: any,
  ) {
    const userId = client.data.userId;
    if (!userId) {
      client.emit('error', 'You must be authenticated to join a room');
      return;
    }
    client.leave(gameId);
    console.log(`Client ${client.id} left room ${gameId}`);
  }
}
