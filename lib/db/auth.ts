import db from '@/lib/db/prisma';
import type { Prisma } from '@/lib/generated/prisma/client';

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await db.user.create({
    data: user,
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};
