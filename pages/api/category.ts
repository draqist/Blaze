// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return 
  } else if (req.method === 'GET') {
    return await Promise.all([seedCategory(req, res), seedNotes(req,res)])
  }
}
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
  }
]

export const seedCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categoryseed = await prisma.category.createMany({
      data: categories,
    });
    return res.status(200).json(categoryseed);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Couldn't seed database categories" });
  }
};
export const seedNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const noteseed = await prisma.notes.createMany({
      data: notes,
    });
    return res.status(200).json(noteseed);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Couldn't seed database notes" });
  }
};


