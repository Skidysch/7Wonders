import { Wonder } from 'src/types/wonder.interface';

export const wonders: Wonder[] = [
  // Alexandria
  {
    id: 'alexandria_A',
    name: 'Alexandria',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['GLASS'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE'] }],
        provides: [
          {
            type: 'resource-choice',
            resources: ['WOOD', 'CLAY', 'STONE', 'ORE'],
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['GLASS', 'GLASS'] }],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'alexandria_B',
    name: 'Alexandria',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['GLASS'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY'] }],
        provides: [
          {
            type: 'resource-choice',
            resources: ['WOOD', 'CLAY', 'STONE', 'ORE'],
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [
          {
            type: 'resource-choice',
            resources: ['GLASS', 'PAPER', 'TEXTILE'],
          },
        ],
      },
      {
        cost: [
          {
            type: 'resource',
            resources: ['STONE', 'STONE', 'STONE'],
          },
        ],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },

  // Babylon
  {
    id: 'babylon_A',
    name: 'Babylon',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['CLAY'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD', 'WOOD'] }],
        provides: [
          { type: 'science-choice', symbols: ['GEAR', 'TABLET', 'COMPASS'] },
        ],
      },
      {
        cost: [
          { type: 'resource', resources: ['CLAY', 'CLAY', 'CLAY', 'CLAY'] },
        ],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'babylon_B',
    name: 'Babylon',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['CLAY'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'TEXTILE'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD', 'GLASS'] }],
        // TODO: Play last card in each age
        provides: [],
      },
      {
        cost: [
          { type: 'resource', resources: ['CLAY', 'CLAY', 'CLAY', 'PAPER'] },
        ],
        provides: [
          { type: 'science-choice', symbols: ['GEAR', 'TABLET', 'COMPASS'] },
        ],
      },
    ],
  },

  // Ephesus
  {
    id: 'ephesus_A',
    name: 'Ephesus',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['PAPER'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [{ type: 'coins', amount: 9 }],
      },
      {
        cost: [{ type: 'resource', resources: ['PAPER', 'PAPER'] }],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'ephesus_B',
    name: 'Ephesus',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['PAPER'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [
          { type: 'points', amount: 2 },
          { type: 'coins', amount: 4 },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [
          { type: 'points', amount: 3 },
          { type: 'coins', amount: 4 },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['PAPER', 'TEXTILE', 'GLASS'] }],
        provides: [
          { type: 'points', amount: 5 },
          { type: 'coins', amount: 4 },
        ],
      },
    ],
  },

  // Giza
  {
    id: 'giza_A',
    name: 'Giza',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['STONE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD', 'WOOD'] }],
        provides: [{ type: 'points', amount: 5 }],
      },
      {
        cost: [
          { type: 'resource', resources: ['STONE', 'STONE', 'STONE', 'STONE'] },
        ],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'giza_B',
    name: 'Giza',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['STONE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE', 'STONE'] }],
        provides: [{ type: 'points', amount: 5 }],
      },
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY', 'CLAY'] }],
        provides: [{ type: 'points', amount: 5 }],
      },
      {
        cost: [
          {
            type: 'resource',
            resources: ['STONE', 'STONE', 'STONE', 'STONE', 'PAPER'],
          },
        ],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },

  // Halicarnassus
  {
    id: 'halicarnassus_A',
    name: 'Halicarnassus',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['TEXTILE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE'] }],
        provides: [
          {
            type: 'buildFromDiscard',
            amount: 1,
            free: true,
            when: 'onStageBuilt',
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['TEXTILE', 'TEXTILE'] }],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'halicarnassus_B',
    name: 'Halicarnassus',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['TEXTILE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE'] }],
        provides: [
          { type: 'points', amount: 2 },
          {
            type: 'buildFromDiscard',
            amount: 1,
            free: true,
            when: 'onStageBuilt',
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY', 'CLAY'] }],
        provides: [
          { type: 'points', amount: 1 },
          {
            type: 'buildFromDiscard',
            amount: 1,
            free: true,
            when: 'onStageBuilt',
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['GLASS', 'PAPER', 'TEXTILE'] }],
        provides: [
          {
            type: 'buildFromDiscard',
            amount: 1,
            free: true,
            when: 'onStageBuilt',
          },
        ],
      },
    ],
  },

  // Olympia
  {
    id: 'olympia_A',
    name: 'Olympia',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['WOOD'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [{ type: 'freeBuildPerAge', usages: 1, per: 'age' }],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE'] }],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'olympia_B',
    name: 'Olympia',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['WOOD'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [
          {
            type: 'discount',
            neighbors: 'both',
            resources: ['WOOD', 'CLAY', 'STONE', 'ORE'],
          },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE'] }],
        provides: [{ type: 'points', amount: 5 }],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE', 'TEXTILE'] }],
        provides: [{ type: 'copyGuild', when: 'endOfGame', from: 'both' }],
      },
    ],
  },

  // Rhodos
  {
    id: 'rhodos_A',
    name: 'Rhodos',
    side: 'A',
    startingEffect: [{ type: 'resource', resources: ['ORE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'CLAY', 'CLAY'] }],
        provides: [{ type: 'military', strength: 2 }],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE', 'ORE', 'ORE'] }],
        provides: [{ type: 'points', amount: 7 }],
      },
    ],
  },
  {
    id: 'rhodos_B',
    name: 'Rhodos',
    side: 'B',
    startingEffect: [{ type: 'resource', resources: ['ORE'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['STONE', 'STONE', 'STONE'] }],
        provides: [
          { type: 'points', amount: 3 },
          { type: 'coins', amount: 3 },
          { type: 'military', strength: 1 },
        ],
      },
      {
        cost: [{ type: 'resource', resources: ['ORE', 'ORE', 'ORE', 'ORE'] }],
        provides: [
          { type: 'points', amount: 4 },
          { type: 'coins', amount: 4 },
          { type: 'military', strength: 1 },
        ],
      },
    ],
  },
];
