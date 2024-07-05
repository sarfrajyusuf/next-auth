import connectDB from "@/config/db";
import User from "@/models/userModel";
import sendEmail from "@/helpers/mailer";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function POST(req: NextRequest) {
  try {
    const {
      username,
      email,
      password,
    }: { username: string; email: string; password: string } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({
        message: "All fields are required",
        status: 400,
      });
    }

    const isExist = await User.findOne({ email });
    if (isExist) {
      return NextResponse.json({
        message: "User Already Exists!",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json({
      message: "User Successfully Registered!",
      status: 201,
      body: { user },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
