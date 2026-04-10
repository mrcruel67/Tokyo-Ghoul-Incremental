export const calculateDamage = (attacker, defender) => {
  let baseDamage = (attacker.stats?.strength || 5) * 2;

  // Equipment influence
  if (attacker.equipment?.weapon) {
    baseDamage += attacker.equipment.weapon.damage || 0;
  }

  const variance = Math.random() * 0.2 + 0.9; // 0.9 to 1.1
  let multiplier = 1;

  // Path-specific logic
  if (attacker.path === 'ghoul' && attacker.kakuganActive) {
    multiplier *= 1.5;
  }

  // RC Type Advantage (simplified)
  // Ukaku > Bikaku > Rinkaku > Koukaku > Ukaku
  const advantages = {
    ukaku: 'bikaku',
    bikaku: 'rinkaku',
    rinkaku: 'koukaku',
    koukaku: 'ukaku'
  };

  if (advantages[attacker.rcType] === defender.rcType) {
    multiplier *= 1.25;
  }

  let finalDamage = baseDamage * multiplier * variance;

  // Defender equipment
  if (defender.equipment?.armor) {
    finalDamage = Math.max(1, finalDamage - (defender.equipment.armor.defense || 0));
  }

  return Math.floor(finalDamage);
};

export const processTurn = (player, enemy) => {
  const playerDamage = calculateDamage(player, enemy);
  const enemyDamage = calculateDamage(enemy, player);

  return {
    playerDamage,
    enemyDamage,
    playerDead: player.hp - enemyDamage <= 0,
    enemyDead: enemy.hp - playerDamage <= 0,
  };
};
