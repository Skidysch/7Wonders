import { GameState } from 'src/types/game.interface'

export function resolveRound(game: GameState) {
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