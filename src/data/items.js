export const ITEMS = {
  CONSUMABLES: {
    HUMAN_MEAT: { id: 'meat', name: 'Human Meat', type: 'food', ghoulOnly: true, hunger: 50, sanity: -5, rc: 100 },
    COFFEE: { id: 'coffee', name: 'Special Coffee', type: 'drink', ghoulOnly: true, hunger: 5, sanity: 10, rc: 5 },
    RC_SUPPRESSANT: { id: 'rc_suppressant', name: 'RC Suppressant', type: 'medicine', ghoulOnly: false, rc: -500, sanity: 5 },
    MEDKIT: { id: 'medkit', name: 'Medical Kit', type: 'medicine', hp: 50 },
  },
  WEAPONS: {
    // For Humans
    BASIC_QUINQUE: { id: 'q_basic', name: 'Basic Quinque', path: 'human', damage: 15, scaling: 'strength' },
    // For Ghouls
    KAGUNE_ENHANCER: { id: 'k_enhancer', name: 'RC Stimulant', path: 'ghoul', damageMultiplier: 1.2 },
  }
};
