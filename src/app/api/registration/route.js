import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/mongodb";

export async function GET() {
   try {
      await connectDB();
      const registrations = await Registration.find({}).sort({ createdAt: -1 });
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
