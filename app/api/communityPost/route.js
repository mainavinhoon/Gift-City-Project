import { MongodbConnection } from "../../../lib/mongodb";
import Post from "@/models/post"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await MongodbConnection();
    const  formData = await req.json();
    await Post.create(formData );
    console.log(formData)


    return NextResponse.json(formData );
  } catch (error) {
    console.log(error);
  }
}
export async function GET(req,res) {
  try {
    await MongodbConnection();
    const data = await Post.find().populate("likes").populate("comments").exec();
    

  

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}