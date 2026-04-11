import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: {
      slug: 'starter-template-demo',
    },
    update: {
      name: 'Starter template demo',
      summary:
        'A seeded public project that demonstrates the starter repository and service pattern before you wire in your own domain.',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      isStarterExample: true,
    },
    create: {
      name: 'Starter template demo',
      slug: 'starter-template-demo',
      summary:
        'A seeded public project that demonstrates the starter repository and service pattern before you wire in your own domain.',
      status: 'ACTIVE',
      visibility: 'PUBLIC',
      isStarterExample: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
