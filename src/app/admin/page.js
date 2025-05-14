import RegistrationsTable from "@/components/RegistrationTable";

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">View and manage all registrations</p>
      </div>

      <RegistrationsTable />
    </div>
  );
}
