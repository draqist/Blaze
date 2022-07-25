import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    return await updateTask(req, res);
  } else {
    const {selId} = req.query
    try {
      const Delete = await prisma.task.delete({
        where: {
          // @ts-ignore
          id : selId
        },
        select: {
          title: true
        }
      })
      return res.status(200).json({Delete, message: 'deleted the selected task'})
    } catch (error) {
      
    }  
  }
}

export const updateTask = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  console.log(body)
  try {
    const updateTask = await prisma.task.upsert({
      where: {
        // @ts-ignore
        id: body.authorId
      },
      update: {
        categoryId: body.categoryId
      },
      create: {
        title: body.title,
        description: body.description,
        label: body.label,
        authorId: body.authorId,
        categoryId: body.categoryId
      }
    })
    res.status(200).json(updateTask);
    console.log(res)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Task could not be updated"});
  }
}
