import { MongodbConnection } from "../../../lib/mongodb";
import Post from "@/models/post"
import Profile from "@/models/profile"
import { NextRequest, NextResponse } from "next/server";

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
export async function GET(req) {
  try {
    await MongodbConnection();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      throw new Error('Email query parameter is missing');
    }

    console.log("input Email", email);

    const data = await Profile.findOne({ email:email });
    console.log("Profile data", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}