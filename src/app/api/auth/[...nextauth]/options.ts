import prisma from "@/DB/db.config";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  username?: string | null;
  email?: string | null;
  image?: string | null;
}
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (user) {
          return {
            ...user,
            id: user.id.toString(),
          };
        } else {
          return null;
        }
      },
    }),
  ],
};
