import { MongodbConnection } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req,res) {
    try {
      await MongodbConnection();

      const { searchParams } = new URL(req.url);
      const email = searchParams.get('email');
  
      if (!email) {
        throw new Error('Email query parameter is missing');
      }
  
      console.log("input Email", email);
      const data = await Post.find({username:email});
      
      return NextResponse.json(data);
    } catch (error) {
      console.log(error);
    }
  }