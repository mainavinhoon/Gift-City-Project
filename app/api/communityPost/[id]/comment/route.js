import { MongodbConnection } from "../../../../../lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await MongodbConnection();
    const { id } = params;
    const { username, body } = await req.json();

    if (!username || !body) {
      return NextResponse.json({ error: "Missing username or body" }, { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const newComment = {
      username,
      body,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    return NextResponse.json({ success: true, comments: post.comments });
  } catch (error) {
    console.error("Comment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
