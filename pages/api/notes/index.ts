import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    return await createNote(req, res);
  } else if (req.method === 'GET') {
    return await getNotes(req, res);
  } else if (req.method === 'PUT') {
    return await updateNotes(req, res);
  } else if (req.method === 'DELETE') {
    return await deleteNotes(req, res);
  } else {
    res.status(405).json({ message: 'Method is not allowed.' });
  }
}

export const createNote = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  try {
    const createdNote = await prisma.note.create({
      data: {
        title: body.title,
        note: body.note,
        label: body.label,
        authorId: body.authorId,
        noteId: body.noteId,
      },
    });
    return res.status(200).json(createdNote);
  } catch (error) {
    return res.status(500).json({ message: 'Could not create task' });
  }
};

export const getNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const Tasks = await prisma.notes.findMany({
      select: {
        id: true,
        title: true,
        notes: {
          orderBy: {
            id: 'desc',
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
      take:4
    });
    return res.status(200).json(Tasks);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Couldn't fetch notes from the database" });
  }
};

export const updateNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const body = req.body;
  try {
    const updateNotes = await prisma.note.upsert({
      where: {
        // @ts-ignore
        id: body.uid,
      },
      update: {
        noteId: body.noteId,
      },
      create: {
        title: body.title,
        note: body.note,
        label: body.label,
        authorId: body.authorId,
        noteId: body.noteId,
      },
    });
    res.status(200).json(updateNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Task could not be updated' });
  }
};
export const deleteNotes = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const body = req.body;
  console.log(body);
  try {
    const deleteNotes = await prisma.task.delete({
      where: {
        // @ts-ignore
        id: body.uid,
      },
      select: {
        title: true,
      },
    });
    res.status(200).json(deleteNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Task could not be updated' });
  }
};
