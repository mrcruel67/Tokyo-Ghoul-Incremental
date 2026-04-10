export const DISTRICTS = {
  1: { name: "1st District (Chiyoda)", threat: "High", description: "CCG Headquarters. Extremely dangerous for ghouls." },
  4: { name: "4th District (Shinjuku)", threat: "Medium", description: "High ghoul activity. Good for hunting." },
  13: { name: "13th District (Shibuya)", threat: "Medium", description: "Young ghouls and frequent territory disputes." },
  20: { name: "20th District (Nerima)", threat: "Low", description: "Relatively peaceful. Home to Anteiku." },
  24: { name: "24th District", threat: "Extreme", description: "The underground labyrinth. Full of hostile ghouls and CCG death squads." },
};

export const SECTOR_TYPES = {
  STREET: { name: "Dark Alley", danger: 0.1, loot: ["meat", "money"] },
  CAFE: { name: "Quiet Cafe", danger: 0.0, loot: ["coffee"] },
  CONSTRUCTION: { name: "Construction Site", danger: 0.2, loot: ["steel", "wood"] },
  CCG_OUTPOST: { name: "CCG Outpost", danger: 0.8, loot: ["supplies", "qBullets"] },
  HIDEOUT: { name: "Ghoul Hideout", danger: 0.5, loot: ["meat", "rcSuppressants"] },
};
