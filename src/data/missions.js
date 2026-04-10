export const MISSION_POOL = [
  {
    id: 'm1',
    title: 'The Scent of Coffee',
    description: 'Procure 15 packs of coffee from the local market to mask your scent.',
    reward: { money: 100, xp: 50, coffee: 10 },
    goal: { resource: 'coffee', amount: 15 },
    path: 'ghoul'
  },
  {
    id: 'm2',
    title: 'CCG Patrol',
    description: 'Complete 3 explorations in District 20 to secure the area.',
    reward: { money: 500, xp: 100, supplies: 20 },
    goal: { type: 'explore', amount: 3 },
    path: 'human'
  },
  {
    id: 'm3',
    title: 'First Hunt',
    description: 'Hunt and obtain 5 units of fresh meat.',
    reward: { money: 0, xp: 150, meat: 10 },
    goal: { resource: 'meat', amount: 5 },
    path: 'ghoul'
  },
  {
    id: 'm4',
    title: 'Urban Legend',
    description: 'Defeat 2 enemies in combat to prove your strength.',
    reward: { money: 200, xp: 300 },
    goal: { type: 'combat', amount: 2 },
    path: 'ghoul'
  }
];
