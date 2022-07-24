// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await createTask(req, res);
  } else if (req.method === 'GET') {
    return await getTasks(req, res);
  }
}

export const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
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

export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const createdTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        label: body.label,
        authorId: body.author_id,
        dueDate: body.dueDate,
      },
    });
    console.log(res);
    return res.status(200).json(createdTask);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create task' });
  }
};
