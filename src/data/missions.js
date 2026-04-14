export const MISSION_POOL = [
  {
    id: 'm1',
    title: { en: 'The Scent of Coffee', pt: 'O Cheiro do Café' },
    description: {
      en: 'Procure 15 packs of coffee from the local market to mask your scent.',
      pt: 'Consiga 15 pacotes de café do mercado local para mascarar seu cheiro.'
    },
    reward: { money: 100, xp: 50, coffee: 10 },
    goal: { resource: 'coffee', amount: 15 },
    path: 'ghoul'
  },
  {
    id: 'm2',
    title: { en: 'CCG Patrol', pt: 'Patrulha da CCG' },
    description: {
      en: 'Complete 3 explorations in District 20 to secure the area.',
      pt: 'Complete 3 explorações no Distrito 20 para garantir a segurança da área.'
    },
    reward: { money: 500, xp: 100, supplies: 20 },
    goal: { type: 'explore', amount: 3 },
    path: 'human'
  },
  {
    id: 'm3',
    title: { en: 'First Hunt', pt: 'Primeira Caçada' },
    description: {
      en: 'Hunt and obtain 5 units of fresh meat.',
      pt: 'Cace e obtenha 5 unidades de carne fresca.'
    },
    reward: { money: 0, xp: 150, meat: 10 },
    goal: { resource: 'meat', amount: 5 },
    path: 'ghoul'
  },
  {
    id: 'm4',
    title: { en: 'Urban Legend', pt: 'Lenda Urbana' },
    description: {
      en: 'Defeat 2 enemies in combat to prove your strength.',
      pt: 'Derrote 2 inimigos em combate para provar sua força.'
    },
    reward: { money: 200, xp: 300 },
    goal: { type: 'combat', amount: 2 },
    path: 'ghoul'
  },
  {
    id: 'm5',
    title: { en: 'Scrap Metal', pt: 'Sucata de Metal' },
    description: {
      en: 'Gather 10 units of steel for hideout upgrades.',
      pt: 'Colete 10 unidades de aço para melhorias no esconderijo.'
    },
    reward: { money: 300, xp: 100 },
    goal: { resource: 'steel', amount: 10 },
    path: 'ghoul',
    repeatable: true
  },
  {
    id: 'm6',
    title: { en: 'CCG Training', pt: 'Treinamento CCG' },
    description: {
      en: 'Complete 5 manual stamina recoveries to build your endurance.',
      pt: 'Complete 5 recuperações manuais de estamina para aumentar sua resistência.'
    },
    reward: { money: 100, xp: 200 },
    goal: { type: 'manual_recover', amount: 5 },
    path: 'human',
    repeatable: true
  },
  {
    id: 'm7',
    title: { en: 'District Surveillance', pt: 'Vigilância do Distrito' },
    description: {
      en: 'Explore District 20 five times to maintain order.',
      pt: 'Explore o Distrito 20 cinco vezes para manter a ordem.'
    },
    reward: { supplies: 10, money: 500, xp: 300 },
    goal: { type: 'explore', amount: 5 },
    path: 'human',
    repeatable: true
  }
];
