import { MongodbConnection } from "../../../lib/mongodb";
import Post from "@/models/post"
import Profile from "@/models/profile"
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await MongodbConnection();
    const  profileData = await req.json();
    await Profile.create(profileData );
    console.log(profileData)
    return NextResponse.json(profileData);
  } catch (error) {
    console.log(error);
  }
}
export async function GET(req,res) {
  try {
    await MongodbConnection();
    const data = await Profile.find(username);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}