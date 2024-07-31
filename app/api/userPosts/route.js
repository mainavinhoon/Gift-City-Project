import { MongodbConnection } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await MongodbConnection();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query parameter is missing' }, { status: 400 });
    }

    console.log("input Email", email);
    const data = await Post.find({ username: email });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
