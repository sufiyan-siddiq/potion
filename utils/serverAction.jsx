'use server'
import prisma from "@/prisma"
import { connectToDB } from "@/utils"

export const archive = async (id, userId, isArchived) => {
  id = Number(id);
  userId = Number(userId);
  isArchived = Boolean(isArchived)
  try {
    await connectToDB()
    const recursiveArchive = async (id, userId, isArchived) => {
      await prisma.document.update({ where: { id }, data: { isArchived: !isArchived } })
      const children = await prisma.document.findMany({
        where: {
          userId: userId,
          parentId: id,
        },
      });
      for (const child of children) {
        await prisma.document.update({
          where: { id: child.id },
          data: { isArchived: !isArchived },
        });

        await recursiveArchive(child.id, userId, isArchived);
      }
    };
    recursiveArchive(id, userId, isArchived)
    return 200
  } catch (error) {
    console.log(error)
  } finally {
    prisma.$disconnect()
  }
}