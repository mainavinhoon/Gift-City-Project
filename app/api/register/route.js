import { MongodbConnection } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
await MongodbConnection();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const hashPassword = await bcrypt.hash(password, 10);

  

    await User.create({ username, email, password: hashPassword });
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}