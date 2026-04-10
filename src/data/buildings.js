import { Hammer, Coffee, Beef } from 'lucide-react';

export const BUILDINGS = [
  {
    id: 'meat_locker',
    name: 'Meat Locker',
    icon: Beef,
    description: 'A cold storage for human meat. Increases passive meat collection.',
    cost: { money: 1000, steel: 50 },
    production: { meat: 0.1 }
  },
  {
    id: 'coffee_machine',
    name: 'Industrial Coffee Machine',
    icon: Coffee,
    description: 'Produces high-quality coffee to mask your scent.',
    cost: { money: 500, steel: 20 },
    production: { coffee: 0.05 }
  },
  {
    id: 'scrap_collector',
    name: 'Scrap Collector',
    icon: Hammer,
    description: 'Automatically scavenges for steel and useful parts.',
    cost: { money: 2000, wood: 50 },
    production: { steel: 0.2 }
  },
];
