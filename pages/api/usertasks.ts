import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await getTasks(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const getTasks = async (req: NextApiRequest, res: NextApiResponse) => {
  const  {email} = req.body;
  try {
    const tasks = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        category: {
          orderBy: {
            id: "asc"
          },
          select: {
            id: true,
            title: true,
            tasks: {
              orderBy: {
                id: "desc"
              },
            }
          }
        },
      }
    })
    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch tasks from the database" });
  }
};
