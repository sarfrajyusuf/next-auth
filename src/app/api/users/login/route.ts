import connectDB from "@/config/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 400,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        message: "Password is not valid",
        status: 400,
      });
    }
    const payload = { id: user._id, email: user.email };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "7d",
    });

    const res = NextResponse.json({
      status: 200,
      message: "Login Successfully",
      accessToken,
      refreshToken,
    });

    res.cookies.set("token", accessToken, { httpOnly: true });
    return res;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
