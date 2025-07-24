import { FactionSide } from '@prisma/client'
import { CardEffect, Cost } from './card.interface'

export interface WonderStage {
  cost: Cost[];
  provides: CardEffect[];
  builtAtTurn?: number;
}

export interface Wonder {
  id: string;
  name: string;
  side: FactionSide;
  startingEffect: CardEffect[];
  stages: WonderStage[];
}