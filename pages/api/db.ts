// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {}

export const allTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const Tasks = await prisma.task.findMany();
    return res.status(200).json(Tasks);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch tasks from the database" });
  }
};

export const addTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        label: body.label,
        progress: body.progress,
        date: body.date,
        author: body.author,
      },
    });
    return res.status(200).json(newTask);
  } catch (error) {}
};
