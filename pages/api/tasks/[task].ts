import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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