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
  } else if (req.method === 'PUT') {
    return await updateTask(req, res);
  } else if (req.method === 'DELETE') {
    return await deleteTask(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const createTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const createdTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        label: body.label,
        categoryId: body.categoryId,
        // dueDate: body.dueDate,
      },
    });
    return res.status(200).json(createdTask);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create task' });
  }
};

export const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const Tasks = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        tasks: {
          orderBy: {
            id: 'desc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    return res.status(200).json(Tasks);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch tasks from the database" });
  }
};

export const updateTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const updateTask = await prisma.task.upsert({
      where: {
        // @ts-ignore
        id: body.uid,
      },
      update: {
        categoryId: body.categoryId,
      },
      create: {
        title: body.title,
        description: body.description,
        label: body.label,
        categoryId: body.categoryId,
      },
    });
    res.status(200).json(updateTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Task could not be updated' });
  }
};
export const deleteTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  console.log(body);
  try {
    const deletetask = await prisma.task.delete({
      where: {
        // @ts-ignore
        id: body.uid,
      },
      select: {
        title: true,
      },
    });
    res.status(200).json(deletetask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Task could not be updated' });
  }
};
