"use client";

import { punchAttendance } from "@/actions/punch-attendance";
import { useTransition } from "react";

export default function PunchButton({ employeeId }: { employeeId: string }) {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			onClick={() =>
				startTransition(() => {
					punchAttendance(employeeId).catch((err) => alert(err.message));
				})
			}
			disabled={isPending}
			className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
		>
			{isPending ? "Marking..." : "Mark Attendance"}
		</button>
	);
}
