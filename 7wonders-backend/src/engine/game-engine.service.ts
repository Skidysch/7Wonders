import { Injectable } from '@nestjs/common';
import { GameState, PlayerState } from 'src/types/game.interface';
import { GameStoreService } from './games-store.service';
import { LobbyPlayer } from 'src/types/lobby.interface';
import { getGuilds } from './guilds';
import { getAgeDeck, getStartingDeck, shuffle } from './utils';
import { Card } from 'src/types/card.interface';
import { resolveRound } from './resolver';
import { wonders } from './wonders-list.const';
import { Wonder } from 'src/types/wonder.interface';
import { GameGateway } from './game.gateway';

@Injectable()
export class GameEngineService {
  constructor(
    private readonly gameStore: GameStoreService,
    private readonly gameGateway: GameGateway,
  ) {}

  async initializeGameState(gameId: string, players: LobbyPlayer[]) {
    const numPlayers = players.length;
    const deck = getStartingDeck(numPlayers);
    const gameState: GameState = {
      gameId,
      status: 'IN_PROGRESS',
      createdAt: Date.now(),
      age: 1,
      turn: 1,
      submittedActions: [],
      deck: deck,
      ageDeck: getAgeDeck(1, deck),
      guildPool: getGuilds(numPlayers),
      discardPile: [],
      players: {},
      currentPhase: 'draft', // Initial phase is drafting cards
    };

    const { hands } = this.dealHands(gameState.ageDeck, players);

    for (const p of players) {
      const wonder_key = `${p.faction}_${p.factionSide}`;
      const wonder = wonders.find((w) => w.id === wonder_key) as Wonder;
      const startingResource = wonder.startingEffect[0]['resources'];

      gameState.players[p.userId] = {
        userId: p.userId,
        username: p.username,
        faction: p.faction,
        factionSide: p.factionSide,
        hand: hands[p.userId],
        resources: startingResource,
        playedCards: [],
        discardedCards: [],
        builtStages: [],
        coins: 3, // Default starting coins
        militaryTokens: [],
      };
    }

    await this.gameStore.saveGame(gameId, gameState);
    this.gameGateway.sendGameStateToPlayers(gameId, gameState);
  }

  async playCard(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gameStore.getGame(gameId);
    const player = game.players[userId];

    const cardIndex = player.hand.findIndex((card) => card.id === cardId);
    if (!cardIndex) {
      throw new Error('Card not in player hand');
    }

    const [card] = player.hand.splice(cardIndex, 1);
    player.playedCards.push(card);

    this.markPlayerActionSubmitted(game, userId);

    if (this.allPlayersSubmitted(game)) {
      resolveRound(game);
    }

    await this.gameStore.saveGame(gameId, game);
    return game;
  }

  async buildStage(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gameStore.getGame(gameId);
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
      resolveRound(game);
    }

    await this.gameStore.saveGame(gameId, game);
    return game;
  }

  async discardCard(
    gameId: string,
    userId: string,
    cardId: string,
  ): Promise<GameState> {
    const game = await this.gameStore.getGame(gameId);
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
      resolveRound(game);
    }

    await this.gameStore.saveGame(gameId, game);
    return game;
  }

  // --- Helpers ---

  private markPlayerActionSubmitted(game: GameState, userId: string) {
    game.submittedActions.push(userId);
  }

  private allPlayersSubmitted(game: GameState): boolean {
    return game.submittedActions.length === Object.keys(game.players).length;
  }

  private handleEndOfAge(game: GameState) {
    game.age += 1;
    game.turn = 1;

    if (game.age > 3) {
      game.status = 'FINISHED';
      // TODO: Final scoring
    } else {
      game.ageDeck = getAgeDeck(game.age, game.deck, game.guildPool);
    }
  }

  private dealHands(
    ageDeck: Card[],
    players: LobbyPlayer[],
  ): {
    hands: Record<string, Card[]>;
  } {
    const shuffled = shuffle(ageDeck);
    const hands: Record<string, Card[]> = {};

    for (const player of players) {
      const hand = shuffled.slice(0, 7);
      hands[player.userId] = hand;
    }

    return { hands };
  }
}
