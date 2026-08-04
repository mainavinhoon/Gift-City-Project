import { MongodbConnection } from "../../../../../lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await MongodbConnection();
    const { id } = params;
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.likes) {
      post.likes = [];
    }

    const hasLiked = post.likes.includes(email);
    if (hasLiked) {
      post.likes = post.likes.filter(e => e !== email);
    } else {
      post.likes.push(email);
    }

    await post.save();

    return NextResponse.json({ success: true, likes: post.likes, hasLiked: !hasLiked });
  } catch (error) {
    console.error("Like error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
