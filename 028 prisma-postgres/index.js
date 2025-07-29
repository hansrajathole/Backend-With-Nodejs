const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'raj',
      email: 'raj@example.com',
    },
  });

  console.log('User created:', user);

  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
