import { Injectable } from '@nestjs/common';
import { GameState, PlayerState } from 'src/types/game.interface';
import { GamesStoreService } from './games-store.service';
import { LobbyPlayer } from 'src/types/lobby.interface';

@Injectable()
export class GamesEngineService {
  constructor(private gamesStore: GamesStoreService) {}

  async initializeGameState(gameId: string, players: LobbyPlayer[]) {
    const gameState: GameState = {
      gameId,
      status: 'IN_PROGRESS',
      createdAt: Date.now(),
      age: 1,
      turn: 1,
      submittedActions: [],
      deck: [], // This should be initialized with the current Age deck
      guildPool: [], // This should be initialized with the selected guilds for Age 3
      discardPile: [],
      players: {},
      currentPhase: 'draft', // Initial phase is drafting cards
    };

    for (const p of players) {
      gameState.players[p.userId] = {
        userId: p.userId,
        username: p.username,
        faction: p.faction,
        factionSide: p.factionSide,
        hand: [], // This should be initialized with the dealt cards
        //   hand: this.dealInitialCards(), // Implement this
        resources: {},
        playedCards: [],
        discardedCards: [],
        builtStages: [],
        coins: 3, // Default starting coins
        militaryTokens: [],
      };
    }

    await this.gamesStore.saveGame(gameId, gameState);
  }

  async playCard(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gamesStore.getGame(gameId);
    const player = game.players[userId];

    const cardIndex = player.hand.findIndex((card) => card.id === cardId);
    if (!cardIndex) {
      throw new Error('Card not in player hand');
    }

    const [card] = player.hand.splice(cardIndex, 1);
    player.playedCards.push(card);

    this.markPlayerActionSubmitted(game, userId);

    if (this.allPlayersSubmitted(game)) {
      this.resolveRound(game);
    }

    await this.gamesStore.saveGame(gameId, game);
    return game;
  }

  async buildStage(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gamesStore.getGame(gameId);
    const player = game.players[userId];

    // TODO: Check player can afford next wonder stage, validate resources

    const cardIndex = player.hand.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      throw new Error('Card not in player hand');
    }

    const [card] = player.hand.splice(cardIndex, 1);

    player.builtStages.push({
      stage: player.builtStages.length,
      cardUsed: card.id,
      builtAtTurn: game.turn,
    });

    this.markPlayerActionSubmitted(game, userId);

    if (this.allPlayersSubmitted(game)) {
      this.resolveRound(game);
    }

    await this.gamesStore.saveGame(gameId, game);
    return game;
  }

  async discardCard(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gamesStore.getGame(gameId);
    const player = game.players[userId];

    const cardIndex = player.hand.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      throw new Error('Card not in player hand');
    }

    const [card] = player.hand.splice(cardIndex, 1);
    game.discardPile.push(card);
    player.coins += 3;

    this.markPlayerActionSubmitted(game, userId);

    if (this.allPlayersSubmitted(game)) {
      this.resolveRound(game);
    }

    await this.gamesStore.saveGame(gameId, game);
    return game;
  }

  // --- Helpers ---

  private markPlayerActionSubmitted(game: GameState, userId: string) {
    game.submittedActions.push(userId);
  }

  private allPlayersSubmitted(game: GameState): boolean {
    return game.submittedActions.length === Object.keys(game.players).length;
  }

  private resolveRound(game: GameState) {
    // Rotate hands, apply effects, clear submission tracker
    const playerIds = Object.keys(game.players);
    const hands = playerIds.map((id) => game.players[id].hand);

    hands.unshift(hands.pop()!);
    if (game.age !== 2) {
      // pass hands clockwise
      hands.unshift(hands.pop()!);
    } else {
      // For Age 2, pass hands counter-clockwise
      hands.push(hands.shift()!);
    }

    playerIds.forEach((id, i) => {
      game.players[id].hand = hands[i];
    });

    game.submittedActions = []; // Clear submitted actions;
    game.turn += 1;

    // Transition to next Age or scoring if turn exceeds 6
    if (game.turn > 6) {
      this.handleEndOfAge(game);
    }
  }

  private handleEndOfAge(game: GameState) {
    game.age += 1;
    game.turn = 1;

    if (game.age > 3) {
      game.status = 'FINISHED';
      // TODO: Final scoring
    } else {
      // TODO: Deal new Age cards
    }
  }
}
