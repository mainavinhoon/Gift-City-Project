import { MongodbConnection } from "../../../lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await MongodbConnection();
    const { eventId, email } = await req.json();

    if (!eventId || !email) {
      return NextResponse.json({ error: "Missing eventId or email" }, { status: 400 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Initialize rsvps array if it doesn't exist
    if (!event.rsvps) {
      event.rsvps = [];
    }

    // Toggle RSVP status
    const hasRSVPd = event.rsvps.includes(email);
    if (hasRSVPd) {
      event.rsvps = event.rsvps.filter(e => e !== email);
    } else {
      event.rsvps.push(email);
    }

    await event.save();

    return NextResponse.json({ success: true, rsvps: event.rsvps, hasRSVPd: !hasRSVPd });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
