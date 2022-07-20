import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await createUser(req, res);
  } else if (req.method === 'UPDATE') {
    return await updateUser(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        bio: body.bio,
        image: body.image,
        userName: body.userName,
        phoneNumber: body.phoneNumber,
      },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: 'abdullahabdulfatah526@gmail.com',
      },
      data: {
        email: body.email,
        password: body.password,
        bio: body.bio,
        image: body.image,
        userName: body.userName,
        phoneNumber: body.phoneNumber,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
