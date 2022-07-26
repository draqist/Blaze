import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await createUser(req, res);
  } else if (req.method === 'PUT') {
    return await updateUser(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    console.log(body)
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
    return res.status(500).json({ message: 'Error creating user' });
  }
};
export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const updatedUser = await prisma.user.upsert({
      where: {
        email: body.email,
      },
      update: {
        email: body.email,
        password: body.password,
        bio: body.bio,
        image: body.image,
        userName: body.userName,
        phoneNumber: body.phoneNumber,
        fullName: body.fullName,
      },
      create: {
        email: body.email,
        password: body.password,
        bio: body.bio,
        image: body.image,
        userName: body.userName,
        phoneNumber: body.phoneNumber,
        fullName: body.fullName,
      }
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error updating user"});
  }
};
