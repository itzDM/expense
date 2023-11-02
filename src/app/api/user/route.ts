import User from "@/app/models/userModel";
import { db } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userName, password } = await req.json();
  await db();

  const user = await User.findOne({ userName: userName });

  if (!user) {
    const hasPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = new User({
      userName: userName,
      password: hasPass,
    });
    try {
      await newUser.save();
      return new NextResponse(JSON.stringify(newUser));
    } catch (error: any) {
      return new NextResponse(error);
    }
  } else {
    return new NextResponse("User Already Exits", {
      status: 501,
    });
  }
};
