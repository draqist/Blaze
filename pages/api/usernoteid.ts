import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await getNoteId(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const getNoteId = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  try {
    const category = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        notes: {
          orderBy: {
            id: 'asc',
          },
          select: {
            id: true,
          },
        },
      },
    });
    return res.status(200).json(category);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch tasks from the database" });
  }
};
