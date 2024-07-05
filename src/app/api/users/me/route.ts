
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connectDB();

/**
 * @param {NextRequest} request - The `request` parameter in the `GET` function is of type
 * @returns The GET function is returning a JSON response. If the user is found successfully, it
 * returns a JSON response with a message "User found" and the user data. If there is an error, it
 * returns a JSON response with the error message and a status code of 400.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
