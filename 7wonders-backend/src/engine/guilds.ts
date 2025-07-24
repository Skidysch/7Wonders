import { Card } from 'src/types/card.interface';
import { cards } from './cards-list.const';

export function getGuilds(players: number): Card[] {
  const guilds: Card[] = cards.filter((card) => card.type === 'GUILD');
  console.log(`Shuffling guilds for ${players} players...`);
  if (players < 3 || players > 7) {
    throw new Error('Invalid number of players. Must be between 3 and 7.');
  }

  const shuffledGuilds = guilds.sort(() => Math.random() - 0.5);
  
  return shuffledGuilds.slice(0, players + 2);
}
