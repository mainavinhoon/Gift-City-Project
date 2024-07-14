import { MongodbConnection } from "../../../lib/mongodb";
import Post from "@/models/post"
import Like from "@/models/like"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await MongodbConnection();
      const  {post,username} = await req.json();
      const like = new Like({

        post,username
    })

    const savedLikes = await like.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLikes._id } },
      { new: true }
    ).populate("likes").exec();

      return NextResponse.json({ updatedPost});
    } catch (error) {
      console.log(error);
    }
  }

