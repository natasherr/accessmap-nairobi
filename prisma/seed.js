import { PrismaClient } from '../src/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedVenues } from '../src/data/seedVenues.js';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const data = seedVenues.map(v => ({
    id: v.id,
    slug: v.slug,
    name: v.name,
    area: v.area,
    address: v.address,
    category: v.category,
    ramp: v.accessibility.ramp,
    lift: v.accessibility.lift,
    accessibleToilet: v.accessibility.accessibleToilet,
    accessibleParking: v.accessibility.accessibleParking,
    tactilePaving: v.accessibility.tactilePaving,
    wideCorridors: v.accessibility.wideCorridors,
    audioAssistance: v.accessibility.audioAssistance,
    staffAssistance: v.accessibility.staffAssistance,
    lat: v.coordinates.lat,
    lng: v.coordinates.lng,
    addedAt: new Date(v.addedAt),
    isSeeded: v.isSeeded,
  }));

  await prisma.venue.createMany({ data, skipDuplicates: true });
  console.log(`Seeded ${data.length} venues.`);
}

main().finally(() => prisma.$disconnect());