"use client";

import { useTransition } from "react";
import { deleteEmployee } from "@/actions/delete-employee";

export default function EmployeeRow({ emp }: { emp: any }) {
	const [isPending, startTransition] = useTransition();

	function handleDelete() {
		const confirmed = confirm(`Are you sure you want to delete ${emp.name}?`);
		if (!confirmed) return;

		startTransition(() => {
			deleteEmployee(emp.id).then(() => {
				window.location.reload(); // or use router.refresh() if you’re using next/navigation
			});
		});
	}

	return (
		<tr key={emp.id}>
			<td className="border p-2">{emp.name}</td>
			<td className="border p-2">{emp.user?.email || "-"}</td>
			<td className="border p-2">
				<button
					onClick={handleDelete}
					className="text-red-600 hover:underline disabled:opacity-50 cursor-pointer"
					disabled={isPending}
				>
					{isPending ? "Deleting..." : "Delete"}
				</button>
			</td>
		</tr>
	);
}
