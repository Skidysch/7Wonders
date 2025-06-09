import { CardEffect, Cost } from './card.interface'

export type WonderSide = 'A' | 'B';

export interface WonderStage {
  cost: Cost[];
  provides: CardEffect[];
  builtAtTurn?: number;
}

export interface Wonder {
  id: string;
  name: string;
  side: WonderSide;
  startingEffect?: CardEffect[];
  stages: WonderStage[];
}