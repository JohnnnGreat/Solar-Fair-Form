import { NextResponse } from "next/server";
import Registration from "@/models/Registration";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const registrations = await Registration.find({}).sort({ createdAt: -1 });

    // Convert to CSV format
    const headers = [
      "Organisation Name",
      "Email",
      "Phone",
      "First Name",
      "Last Name",
      "Gender",
      "Categorisation",
      "Registered on Solar Marketplace",
      "Interests",
      "Permission for Future Events",
      "Created At",
    ];

    const rows = registrations.map((registration) => [
      registration.organisationName,
      registration.email,
      registration.phone || "",
      registration.firstName,
      registration.lastName,
      registration.gender || "",
      registration.categorisation,
      registration.registeredOnMarketplace ? "Yes" : "No",
      registration.interests || "",
      registration.permissionForFutureEvents ? "Yes" : "No",
      new Date(registration.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=registrations.csv",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
