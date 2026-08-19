import express from 'express';
import cors from 'cors';
import { PrismaClient } from './src/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedVenues } from './src/data/seedVenues.js';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function ensureSeeded() {
  const count = await prisma.venue.count();
  if (count === 0) {
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
}

function reshapeVenue(v) {
  return {
    id: v.id,
    slug: v.slug,
    name: v.name,
    area: v.area,
    address: v.address,
    category: v.category,
    accessibility: {
      ramp: v.ramp,
      lift: v.lift,
      accessibleToilet: v.accessibleToilet,
      accessibleParking: v.accessibleParking,
      tactilePaving: v.tactilePaving,
      wideCorridors: v.wideCorridors,
      audioAssistance: v.audioAssistance,
      staffAssistance: v.staffAssistance,
    },
    coordinates: { lat: v.lat, lng: v.lng },
    addedAt: v.addedAt,
    isSeeded: v.isSeeded,
  };
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/venues', async (req, res) => {
  const venues = await prisma.venue.findMany();
  res.json(venues.map(reshapeVenue));
});

app.get('/api/venues/:slug', async (req, res) => {
  const venue = await prisma.venue.findUnique({ where: { slug: req.params.slug } });
  if (!venue) return res.status(404).json({ error: 'Not found' });
  res.json(reshapeVenue(venue));
});

app.post('/api/venues', async (req, res) => {
  try {
    const v = req.body;

    const duplicate = await prisma.venue.findFirst({
      where: { name: v.name, area: v.area },
    });
    if (duplicate) {
      return res.status(409).json({
        error: 'A venue with this name already exists in this area.',
        existing: reshapeVenue(duplicate),
      });
    }

    const newVenue = await prisma.venue.create({
      data: {
        id: 'v_' + Date.now(),
        slug: generateSlug(v.name),
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
        addedAt: new Date(),
        isSeeded: false,
      },
    });
    res.status(201).json(reshapeVenue(newVenue));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

await ensureSeeded();
app.listen(3000, () => console.log('API running on http://localhost:3000'));