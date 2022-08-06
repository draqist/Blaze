const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    title: 'To-Do',
    authorId: 1,
  },
  {
    title: 'Work-in-progress',
    authorId: 1,
  },
  {
    title: 'Review',
    authorId: 1,
  },
  {
    title: 'Completed',
    authorId: 1,
  },
];
const notes = [
  {
    title: 'School',
  },
  {
    title: 'Personal',
  },
  {
    title: 'Work',
  },
];

const seedCategory = async () => {
  try {
    await prisma.category.deleteMany();
    await prisma.category.createMany({
      data: categories,
    });
    console.log('Added category data');
    await prisma.notes.deleteMany();
    await prisma.notes.createMany({
      data: notes,
    });
    console.log('Added notes data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

seedCategory();
