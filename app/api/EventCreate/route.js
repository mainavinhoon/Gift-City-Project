import { MongodbConnection } from "../../../lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await MongodbConnection();
    const  formData = await req.json();
    await Event.create(formData );
    console.log(formData)


    return NextResponse.json(formData );
  } catch (error) {
    console.log(error);
  }
}
export async function GET(req,res) {
  try {
    await MongodbConnection();
    const data = await Event.find();

  

    return NextResponse.json(data );
  } catch (error) {
    console.log(error);
  }
}