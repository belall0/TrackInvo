import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { loginSchema } from '@/lib/schemas';
import db from '@/data/db';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // validate the fields
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // check if the user exists in the database
        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        // if there's no user or there's a user but uses OAuth
        if (!user || !user.passwordHash) {
          return null;
        }

        // check if the password is correct
        const isMatchedPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isMatchedPassword) {
          return null;
        }

        // if everything is correct, grant access and return the user to be stored in the session
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
