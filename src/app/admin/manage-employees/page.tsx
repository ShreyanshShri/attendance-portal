import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UserRow from "@/components/admin/UserRow";

export default async function EmployeesPage() {
	const employees = await prisma.employee.findMany({
		include: { user: true }, // include user info if needed
	});

	const filteredEmployees = employees.filter(
		(emp) => emp.user?.email !== "admin@example.com"
	);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">All Employees</h1>
			<Link href="/admin/manage-employees/add-employee">
				<Button variant="outline" className="mb-4 cursor-pointer">
					Add New Employee
				</Button>
			</Link>

			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border p-2 text-left">Name</th>
						<th className="border p-2 text-left">Email</th>
						<th className="border p-2 text-left">Action</th>
					</tr>
				</thead>
				<tbody>
					{filteredEmployees.map((emp: any) => (
						<UserRow key={emp.id} emp={emp} />
					))}
				</tbody>
			</table>
		</main>
	);
}
