import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user } = req.query;
  try {
    const getuser = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        email: user,
      },
      select: {
        email: true,
        password: true,
        bio: true,
        image: true,
        userName: true,
        phoneNumber: true,
        fullName: true,
      },
    });
    return res.status(200).json(getuser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Could not find user' });
  }
}
