import connectDB from "@/config/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({
        error: "Invalid Token",
        status: 400,
      });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email Verified Successfully.",
      status: 200,
      body: {  },
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
