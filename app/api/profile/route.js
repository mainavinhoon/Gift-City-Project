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
    const email = await req.body;
    console.log("input Email",email);

    const data = await Profile.findOne({email});
    console.log("Profile data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}