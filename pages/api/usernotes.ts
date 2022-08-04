import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await getNotes(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  const  {email} = req.body;
  try {
    const Tasks = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        notes: {
          orderBy: {
            id: "asc",
          },
          select: {
            id: true,
            title: true,
            notes: {
              orderBy: {
                id: "desc",
              },
              select: {
                id: true,
                title: true,
                note: true,
                createdAt: true,
                label: true,
                noteId: true,
              }
            },
            authorId: true
          }
        }
      }
    });
    return res.status(200).json(Tasks);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch notes from the database" });
  }
};
