import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/app/utils/db";
import User from "@/app/models/userModel";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { userName, password } = credentials as {
          userName: string;
          password: string;
        };
        await db();

        try {
          const user = await User.findOne({
            userName: userName,
          });

          if (user) {
            const isPassCorrect = bcrypt.compareSync(password, user.password);
            if (isPassCorrect) {
              const { password, ...info } = user._doc;
              return info;
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
    async jwt(params: any) {
      if (params.user?.isAdmin) {
        params.token.isAdmin = params.user.isAdmin;
        params.token._id = params.user._id;
      }
      return params.token;
    },
    async session({ session, token }) {
      (session.user as { _id: string })._id = token._id as string;
      (session.user as { isAdmin: boolean }).isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
