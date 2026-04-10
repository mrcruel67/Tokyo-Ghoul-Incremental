import { SECTOR_TYPES } from '../data/districts';

export const generateSectors = (districtId, count = 10) => {
  const sectors = [];
  const types = Object.keys(SECTOR_TYPES);

  for (let i = 0; i < count; i++) {
    const typeKey = types[Math.floor(Math.random() * types.length)];
    const type = SECTOR_TYPES[typeKey];

    sectors.push({
      id: `${districtId}-${i}`,
      type: typeKey,
      name: `${type.name} #${i + 1}`,
      danger: type.danger + (Math.random() * 0.2),
      explored: false,
      cleared: false,
      loot: type.loot,
    });
  }

  return sectors;
};
