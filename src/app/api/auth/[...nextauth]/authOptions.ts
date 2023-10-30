import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/app/utils/db";
import User from "@/app/models/userModel";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await db();

        let returnValue;
        try {
          const user = await User.findOne({
            userName: credentials?.userName,
          });

          if (user) {
            const isPassCorrect = await bcrypt.compare(
              credentials?.password,
              user.password
            );
            if (isPassCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("No User Found");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
