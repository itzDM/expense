import User from "@/app/models/userModel";
import { db } from "@/app/utils/db";

import NextAuth from "next-auth";

import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
