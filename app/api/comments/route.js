import { MongodbConnection } from "../../../lib/mongodb";
import Post from "@/models/post"
import Comment from "@/models/comment"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await MongodbConnection();
      const  {post,username,body} = await req.json();
      const Comments = new Comment({

        post,username,body
    })

    const savedComments = await Comments.save();

    const updatedPost =await Post.findByIdAndUpdate(post,{$push: {comments: savedComments._id}},{new: true});

      return NextResponse.json({ updatedPost});
    } catch (error) {
      console.log(error);
    }
  }