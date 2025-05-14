import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ registrations }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    console.log(body);
    await connectDB();

    const newRegistration = new Registration(body);
    await newRegistration.save();

    return NextResponse.json(
      { message: "Registration successful", registration: newRegistration },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
