export type Age = 1 | 2 | 3;
export type CardType =
  | 'RESOURCE'
  | 'MANUFACTURED'
  | 'CIVILIAN'
  | 'COMMERCIAL'
  | 'MILITARY'
  | 'SCIENTIFIC'
  | 'GUILD'
  | 'WONDER';
export type Resource =
  | 'WOOD'
  | 'STONE'
  | 'CLAY'
  | 'ORE'
  | 'GLASS'
  | 'TEXTILE'
  | 'PAPER';
export type Symbol = 'GEAR' | 'TABLET' | 'COMPASS';

export interface Card {
  id: string;
  name: string;
  age: Age;
  type: CardType;
  minPlayers: number;
  cost?: Cost[];
  provides: CardEffect[];
  chainFrom?: string[];
  chainTo?: string[];
}

export type Cost =
  | { type: 'resource'; resources: Resource[] } // any of the basic resources
  | { type: 'coins'; amount: number };

export type CardEffect =
  | { type: 'resource'; resources: Resource[] } // produces raw or manufactured goods
  | { type: 'resource-choice'; resources: Resource[] }
  | { type: 'military'; strength: number }
  | { type: 'science'; symbol: Symbol }
  | { type: 'science-choice'; symbols: Symbol[] }
  | { type: 'points'; amount: number }
  | { type: 'coins'; amount: number }
  | {
      type: 'discount';
      neighbors: 'left' | 'right' | 'both';
      resources: Resource[];
    }
  | {
      type: 'coin-per-card';
      perCardType: CardType;
      coinPerCard: number;
      from: 'self' | 'neighbors' | 'both';
    }
  | { type: 'guild'; description: string }
  | {
      type: 'point-per-card';
      perCardType: CardType;
      pointPerCard: number;
      from: 'self' | 'neighbors' | 'both';
    }
  | {
      type: 'points-per-military-token';
      tokenType: 'defeat' | 'victory';
      pointsPerToken: number;
      from: 'self' | 'neighbors' | 'both';
    }
  | { type: 'copyGuild'; when: 'endOfGame'; from: 'left' | 'right' | 'both' }
  | {
      type: 'buildFromDiscard';
      when: 'onStageBuilt'; // активируется в момент постройки этапа
      amount: 1; // сколько карт можно выбрать
      free: boolean; // бесплатно или нет
    }
  | {
      type: 'freeBuildPerAge';
      usages: number; // количество использований
      per: 'age'; // ограничение по эпохе
    };
