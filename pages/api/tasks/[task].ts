import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body
  try {
    const updateTask = await prisma.task.upsert({
      where: {
        id: body.uid
      },
      update: {
        title: body.title,
        description: body.description,
        label: body.label,
      },
      create: {
        title: body.title,
        description: body.description,
        label: body.label,
        authorId: body.authorId
      }
    })
    return res.status(200).json(updateTask)
  } catch (error) {
        console.log(error)
  }
}