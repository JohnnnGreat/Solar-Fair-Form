import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/mongodb";
import * as XLSX from "xlsx";

export async function GET() {
   try {
      await connectDB();
      const registrations = await Registration.find({}).sort({ createdAt: -1 });

      // Prepare data for Excel
      const data = registrations.map((registration) => ({
         "Organisation Name": registration.organisationName,
         Email: registration.email,
         Phone: registration.phone || "",
         "First Name": registration.firstName,
         "Last Name": registration.lastName,
         Gender: registration.gender || "",
         Category: registration.categorisation,
         Marketplace: registration.registeredOnMarketplace ? "Yes" : "No",
         Interests: registration.interests || "",
         "Future Events Permission": registration.permissionForFutureEvents ? "Yes" : "No",
         "Registration Date": new Date(registration.createdAt).toLocaleString(),
      }));

      // Create workbook
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

      // Generate Excel file buffer
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

      return new NextResponse(buffer, {
         status: 200,
         headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": "attachment; filename=registrations.xlsx",
         },
      });
   } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
