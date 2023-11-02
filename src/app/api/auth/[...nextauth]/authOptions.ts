import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/app/utils/db";
import UserModel from "@/app/models/userModel";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await db();

        try {
          const user = await UserModel.findOne({
            email: email,
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
    async session({ session, token }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDb = await UserModel.findOne({ email: token.email });
      token.isAdmin = userInDb.isAdmin;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
