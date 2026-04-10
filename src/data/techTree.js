export const TECH_TREE = {
  ghoul: [
    {
      id: 'rc_control_1',
      name: 'RC Control I',
      cost: { xp: 100, rcCells: 500 },
      effect: { rcEfficiency: 1.2 },
      description: "Better control over your RC cells increases regeneration."
    },
    {
      id: 'kakuja_path',
      name: 'Cannibalism Instinct',
      cost: { xp: 500, meat: 50 },
      effect: { unlocks: 'kakuja' },
      description: "Unlock the path to becoming a Kakuja."
    }
  ],
  human: [
    {
      id: 'quinque_tech_1',
      name: 'Quinque Engineering I',
      cost: { xp: 100, steel: 20 },
      effect: { damage: 5 },
      description: "Improve the structural integrity of your Quinque."
    },
    {
      id: 'q_bullets_1',
      name: 'Q-Bullet Manufacturing',
      cost: { xp: 200, steel: 50, supplies: 10 },
      effect: { unlocks: 'qBullets' },
      description: "Produce ammunition specialized against ghouls."
    }
  ]
};
