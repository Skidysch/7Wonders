import { Card } from 'src/types/card.interface'
import { cards } from './cards-list.const'

export function getStartingDeck(players: number): Card[] {
	return cards.filter((card) => card.minPlayers <= players && card.type !== 'GUILD');
}

export function getAgeDeck(age: number, deck: Card[], guilds: Card[] | null = null): Card[] {
	const ageDeck = deck.filter((card) => card.age === age);
	if (age === 3) {
		// For age 3, we add guilds to the deck
		return [...ageDeck, ...guilds!];
	}
	return ageDeck
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}