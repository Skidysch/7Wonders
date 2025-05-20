import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbiesService } from './lobbies.service';
import { UseGuards } from '@nestjs/common';
import { JwtWsGuard } from '../auth/jwt-ws.guard';

@UseGuards(JwtWsGuard)
@WebSocketGateway({
  cors: {
    origin: '*', // или укажи свои фронт-орижины
  },
  namespace: '/lobby',
})
export class LobbiesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly lobbiesService: LobbiesService) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // (опционально) можно удалять игрока из Redis, если хочешь авто-логаут
  }

  @SubscribeMessage('joinLobby')
  async handleJoinLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string },
  ) {
    const { gameId } = data;
    const userId = (client as any).user.sub; // получаем userId из токена, который мы добавили в сокет в JwtWsGuard

    try {
      await this.lobbiesService.addPlayerToLobby(gameId, userId);
      client.join(gameId); // добавляем сокет в комнату по gameId
    } catch (err) {
      client.emit('lobbyError', err.message);
    }
  }

  @SubscribeMessage('leaveLobby')
  async handleLeaveLobby(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string },
  ) {
    const { gameId } = data;
    const userId = (client as any).user.sub; // получаем userId из токена, который мы добавили в сокет в JwtWsGuard

    try {
      await this.lobbiesService.removePlayerFromLobby(gameId, userId);
      client.leave(gameId);
    } catch (err) {
      client.emit('lobbyError', err.message);
    }
  }

  @SubscribeMessage('startGame')
  async handleStartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { gameId: string },
  ) {
    const { gameId } = data;

    try {
      const result = await this.lobbiesService.startGame(gameId);

      this.server.to(gameId).emit('gameStarted', result);
    } catch (err) {
      client.emit('lobbyError', err.message);
    }
  }
}
