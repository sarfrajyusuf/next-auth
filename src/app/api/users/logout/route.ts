import connectDB from "@/config/db";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(req: NextRequest) {
  try {
    const response=await NextResponse.json({
        message:"Logout Successfully",
        status: 200,
    })

    response.cookies.set("token","",{
        httpOnly: true,
        expires:new Date(0)
    })
    return response;
  } catch (error) {
    console.log(error);
  }
}
