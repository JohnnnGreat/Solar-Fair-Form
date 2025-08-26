import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/mongodb";

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

export async function GET() {
   try {
      await connectDB();
      const registrations = await Registration.find({}).sort({ createdAt: -1 });
      console.log(registrations);
      return NextResponse.json({ registrations });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}

export async function DELETE(request) {
   try {
      await connectDB();
      const { id } = await request.json();
      const deletedRegistration = await Registration.findByIdAndDelete(id);

      if (!deletedRegistration) {
         return NextResponse.json({ error: "Registration not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
