import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create()(
  persist(
    (set, get) => ({
      // Player State
      player: {
        name: 'Ken',
        lastNameChange: 0,
        path: null,
        rank: 'C',
        level: 1,
        xp: 0,
        rcCells: 0,
        maxRcCells: 1000,
        rcType: null,
        hp: 100,
        maxHp: 100,
        stamina: 100,
        maxStamina: 100,
        hunger: 100,
        sanity: 100,
        money: 500,
        kakuganActive: false,
        kakujaLevel: 0,
        maskEquipped: false,
        stats: {
          strength: 5,
          agility: 5,
          endurance: 5,
          intelligence: 5,
          rcEfficiency: 1,
        },
        talents: [],
        unlockedDistricts: [20],
        equipment: {
          weapon: null,
          armor: null,
          mask: null,
        },
      },

      // Resources
      resources: {
        meat: 0,
        coffee: 5,
        supplies: 10,
        steel: 0,
        qBullets: 0,
        rcSuppressants: 0,
        wood: 0,
      },

      // Progression
      ownedBuildings: {}, // { buildingId: count }
      completedResearch: [], // [researchId]
      activeMissions: [], // [{ id, title, description, reward, progress, goal, type }]
      completedMissions: [],
      storyChapter: 0,

      // World
      world: {
        currentDistrict: 20,
        discoveredSectors: {},
        currentTime: 0,
        language: 'en',
        themeColor: 'red',
        background: 'default',
        customBg: '',
        stats: {
          explorations: 0,
          enemiesDefeated: 0,
          corpsesConsumed: 0,
          alliesCount: 0,
          territoriesConquered: 0,
          manualRecoveries: 0,
          lastManualStamina: 0,
        },
        reputation: {
          ccg: 0,
          anteiku: 0,
          aogiri: 0,
          clowns: 0
        }
      },

      // Actions
      setPath: (path) => set((state) => ({ player: { ...state.player, path } })),
      setRcType: (rcType) => set((state) => ({ player: { ...state.player, rcType } })),
      toggleKakugan: () => set((state) => ({
        player: { ...state.player, kakuganActive: !state.player.kakuganActive }
      })),

      updateResources: (updates) => set((state) => ({
        resources: { ...state.resources, ...updates }
      })),

      addResource: (res, amount) => set((state) => {
        if (res === 'money') {
          return { player: { ...state.player, money: state.player.money + amount } };
        }
        if (res === 'rcCells') {
          return { player: { ...state.player, rcCells: Math.min(state.player.maxRcCells, state.player.rcCells + amount) } };
        }
        if (res === 'xp') {
          // Redirect to addXp logic or implement here
          const newXp = state.player.xp + amount;
          const nextLevelXp = state.player.level * 100;
          if (newXp >= nextLevelXp) {
            return {
              player: {
                ...state.player,
                level: state.player.level + 1,
                xp: newXp - nextLevelXp,
                maxHp: state.player.maxHp + 20,
                hp: Math.min(state.player.maxHp + 20, state.player.hp + 20),
              }
            };
          }
          return { player: { ...state.player, xp: newXp } };
        }
        return {
          resources: { ...state.resources, [res]: (state.resources[res] || 0) + amount }
        };
      }),

      spendResources: (costs) => set((state) => {
        const newResources = { ...state.resources };
        const newPlayer = { ...state.player };

        for (const [res, val] of Object.entries(costs)) {
          if (res === 'money') newPlayer.money -= val;
          else if (res === 'xp') newPlayer.xp -= val;
          else if (res === 'rcCells') newPlayer.rcCells -= val;
          else newResources[res] -= val;
        }

        return { resources: newResources, player: newPlayer };
      }),

      buyBuilding: (buildingId, costs) => set((state) => {
        const { spendResources } = get();
        // Check if affordable should be done before calling this
        const currentCount = state.ownedBuildings[buildingId] || 0;

        const nextState = {
            ownedBuildings: { ...state.ownedBuildings, [buildingId]: currentCount + 1 }
        };

        // Manual resource deduction because we can't easily call other actions inside set
        const newResources = { ...state.resources };
        const newPlayer = { ...state.player };
        for (const [res, val] of Object.entries(costs)) {
            if (res === 'money') newPlayer.money -= val;
            else if (res === 'xp') newPlayer.xp -= val;
            else if (res === 'rcCells') newPlayer.rcCells -= val;
            else newResources[res] -= val;
        }

        return { ...nextState, resources: newResources, player: newPlayer };
      }),

      unlockResearch: (researchId, costs, effect) => set((state) => {
        const newResources = { ...state.resources };
        const newPlayer = { ...state.player };
        for (const [res, val] of Object.entries(costs)) {
            if (res === 'money') newPlayer.money -= val;
            else if (res === 'xp') newPlayer.xp -= val;
            else if (res === 'rcCells') newPlayer.rcCells -= val;
            else newResources[res] -= val;
        }

        // Apply effect
        if (effect.rcEfficiency) newPlayer.stats.rcEfficiency *= effect.rcEfficiency;
        if (effect.damage) newPlayer.stats.strength += effect.damage / 2; // Rough mapping

        return {
            completedResearch: [...state.completedResearch, researchId],
            resources: newResources,
            player: newPlayer
        };
      }),

      modifyStat: (stat, amount) => set((state) => ({
        player: {
          ...state.player,
          stats: { ...state.player.stats, [stat]: state.player.stats[stat] + amount }
        }
      })),

      updatePlayerHealth: (amount) => set((state) => ({
        player: {
          ...state.player,
          hp: Math.max(0, Math.min(state.player.maxHp, state.player.hp + amount))
        }
      })),

      updatePlayerStamina: (amount) => set((state) => ({
        player: {
          ...state.player,
          stamina: Math.max(0, Math.min(state.player.maxStamina, state.player.stamina + amount))
        }
      })),

      setLanguage: (lang) => set((state) => ({
        world: { ...state.world, language: lang }
      })),

      setTheme: (updates) => set((state) => ({
        world: { ...state.world, ...updates }
      })),

      changePlayerName: (newName) => set((state) => {
        const now = Date.now();
        const cooldown = 24 * 60 * 60 * 1000;
        if (now - state.player.lastNameChange < cooldown) return state;
        return {
          player: { ...state.player, name: newName, lastNameChange: now }
        };
      }),

      equipItem: (type, item) => set((state) => ({
        player: {
          ...state.player,
          equipment: { ...state.player.equipment, [type]: item }
        }
      })),

      addXp: (amount) => set((state) => {
        const newXp = state.player.xp + amount;
        const nextLevelXp = state.player.level * 100;
        if (newXp >= nextLevelXp) {
          return {
            player: {
              ...state.player,
              level: state.player.level + 1,
              xp: newXp - nextLevelXp,
              maxHp: state.player.maxHp + 20,
              hp: state.player.maxHp + 20,
            }
          };
        }
        return { player: { ...state.player, xp: newXp } };
      }),

      acceptMission: (mission) => set((state) => ({
        activeMissions: [...state.activeMissions, mission]
      })),

      completeMission: (missionId) => set((state) => {
        const mission = state.activeMissions.find(m => m.id === missionId);
        if (!mission) return state;

        const { addResource } = get();
        // Rewards
        if (mission.reward) {
          for (const [res, val] of Object.entries(mission.reward)) {
            // Need to handle this manually since we are in set
          }
        }

        const newActive = state.activeMissions.filter(m => m.id !== missionId);
        const newCompleted = [...state.completedMissions, missionId];

        // Manual reward application to avoid store action issues inside set
        const newPlayer = { ...state.player };
        const newResources = { ...state.resources };
        const newWorld = { ...state.world };

        if (mission.reward) {
          for (const [res, val] of Object.entries(mission.reward)) {
            if (res === 'money') newPlayer.money += val;
            else if (res === 'xp') newPlayer.xp += val;
            else if (res === 'reputation') {
              Object.entries(val).forEach(([faction, amount]) => {
                newWorld.reputation[faction] = (newWorld.reputation[faction] || 0) + amount;
              });
            }
            else newResources[res] = (newResources[res] || 0) + val;
          }
        }

        return {
          activeMissions: newActive,
          completedMissions: newCompleted,
          player: newPlayer,
          resources: newResources,
          world: newWorld
        };
      }),

      addReputation: (faction, amount) => set((state) => ({
        world: {
          ...state.world,
          reputation: {
            ...state.world.reputation,
            [faction]: (state.world.reputation[faction] || 0) + amount
          }
        }
      })),

      completeStoryChapter: (chapterId) => set((state) => ({
        storyChapter: Math.max(state.storyChapter, chapterId)
      })),

      tick: (buildingData) => set((state) => {
        const { player, world, resources, ownedBuildings } = state;

        // Passive stamina regen
        let staminaRegen = 0.1;

        // Passive hunger loss
        let hungerLoss = 0.05;
        if (player.kakuganActive) hungerLoss *= 3;

        // Sanity changes
        let sanityChange = 0;
        if (player.hunger < 20) sanityChange -= 0.1;
        if (player.path === 'ghoul' && player.hunger > 80) sanityChange += 0.05;

        // RC Cell regeneration/decay
        let rcChange = 0;
        if (player.path === 'ghoul' || player.path === 'half-ghoul') {
          if (player.hunger > 50) rcChange = 0.1 * player.stats.rcEfficiency;
          else if (player.hunger < 10) rcChange = -0.2;
        }

        // Building Production
        const newResources = { ...resources };
        if (buildingData) {
            for (const [bId, count] of Object.entries(ownedBuildings)) {
                const building = buildingData.find(b => b.id === bId);
                if (building && building.production) {
                    for (const [res, val] of Object.entries(building.production)) {
                        newResources[res] = (newResources[res] || 0) + (val * count);
                    }
                }
            }
        }

        // Random clicks if insane
        const isInsane = player.sanity < 5 || player.hunger < 5;
        if (isInsane && Math.random() < 0.05) {
            // Deplete more hunger/sanity or money
            newResources.money = Math.max(0, (newResources.money || 0) - 5);
        }

        return {
          player: {
            ...player,
            stamina: Math.min(player.maxStamina, player.stamina + staminaRegen),
            hunger: Math.max(0, player.hunger - hungerLoss),
            sanity: Math.max(0, Math.min(100, player.sanity + sanityChange)),
            rcCells: Math.max(0, Math.min(player.maxRcCells, player.rcCells + rcChange)),
          },
          resources: newResources,
          world: {
            ...world,
            currentTime: world.currentTime + 1,
          }
        };
      }),
    }),
    {
      name: 'tokyo-ghoul-rebirth-save',
      version: 2,
      migrate: (persistedState, version) => {
        const state = { ...persistedState };
        if (version < 2) {
            // Add missing structures
            if (!state.world) state.world = {};
            if (!state.world.stats) state.world.stats = {
                explorations: 0, enemiesDefeated: 0, corpsesConsumed: 0,
                alliesCount: 0, territoriesConquered: 0, manualRecoveries: 0,
                lastManualStamina: 0
            };
            if (!state.world.reputation) state.world.reputation = {
                ccg: 0, anteiku: 0, aogiri: 0, clowns: 0
            };
            if (!state.world.language) state.world.language = 'en';
            if (!state.world.themeColor) state.world.themeColor = 'red';

            // Fix old missions that were strings
            state.activeMissions = [];
            state.completedMissions = [];
        }
        return state;
      }
    }
  )
);
