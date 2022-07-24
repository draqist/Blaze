const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    title: 'To-Do',
  },
  {
    title: 'Work-in-progress',
  },
  {
    title: 'Review',
  },
  {
    title: 'Completed',
  },
];

const seedCategory = async () => {
  try {
    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added category data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    prisma.$disconnect(
      
    )
  }
};

seedCategory();
