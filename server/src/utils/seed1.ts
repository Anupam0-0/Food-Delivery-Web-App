import prisma from './prisma'

// CMD : npx prisma db seed

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seeded');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seed error:', e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
