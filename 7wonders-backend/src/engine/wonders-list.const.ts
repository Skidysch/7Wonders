import { Wonder } from 'src/types/wonder.interface';

export const wonders: Wonder[] = [
  // Alexandria
  {
    id: 'ALEXANDRIA_DAY',
    name: 'Alexandria',
    side: 'DAY',
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
    id: 'ALEXANDRIA_NIGHT',
    name: 'Alexandria',
    side: 'NIGHT',
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
    id: 'BABYLON_DAY',
    name: 'Babylon',
    side: 'DAY',
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
    id: 'BABYLON_NIGHT',
    name: 'Babylon',
    side: 'NIGHT',
    startingEffect: [{ type: 'resource', resources: ['CLAY'] }],
    stages: [
      {
        cost: [{ type: 'resource', resources: ['CLAY', 'TEXTILE'] }],
        provides: [{ type: 'points', amount: 3 }],
      },
      {
        cost: [{ type: 'resource', resources: ['WOOD', 'WOOD', 'GLASS'] }],
        provides: [
          {
            type: 'playLastCard',
            when: 'endOfAge',
            amount: 1,
          },
        ],
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
    id: 'EPHESUS_DAY',
    name: 'Ephesus',
    side: 'DAY',
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
    id: 'EPHESUS_NIGHT',
    name: 'Ephesus',
    side: 'NIGHT',
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
    id: 'GIZA_DAY',
    name: 'Giza',
    side: 'DAY',
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
    id: 'GIZA_NIGHT',
    name: 'Giza',
    side: 'NIGHT',
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
    id: 'HALICARNASSUS_DAY',
    name: 'Halicarnassus',
    side: 'DAY',
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
    id: 'HALICARNASSUS_NIGHT',
    name: 'Halicarnassus',
    side: 'NIGHT',
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
    id: 'OLYMPIA_DAY',
    name: 'Olympia',
    side: 'DAY',
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
    id: 'OLYMPIA_NIGHT',
    name: 'Olympia',
    side: 'NIGHT',
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
    id: 'RHODOS_DAY',
    name: 'Rhodos',
    side: 'DAY',
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
    id: 'RHODOS_NIGHT',
    name: 'Rhodos',
    side: 'NIGHT',
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
