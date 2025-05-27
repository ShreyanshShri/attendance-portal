import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, format, eachDayOfInterval } from "date-fns";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/admin/LogoutBtn";
import PunchButton from "@/components/admin/punchAttendanceBtn";
import { toZonedTime } from "date-fns-tz";

const timeZone = "Asia/Kolkata";

export const dynamic = "force-dynamic";

async function getMonthlyAttendance(year: number, month: number) {
	const start = startOfMonth(new Date(year, month - 1));
	const end = endOfMonth(start);

	const [employees, records] = await Promise.all([
		prisma.employee.findMany(),
		prisma.attendance.findMany({
			where: {
				date: {
					gte: start,
					lte: end,
				},
			},
		}),
	]);

	const days = eachDayOfInterval({ start, end });

	const attendanceMap: Record<string, Record<string, string>> = {};
	const totalAttendanceMap: Record<string, number> = {};

	for (const rec of records) {
		const day = format(new Date(rec.date), "yyyy-MM-dd");
		if (!attendanceMap[rec.employeeId]) {
			attendanceMap[rec.employeeId] = {};
		}
		attendanceMap[rec.employeeId][day] = rec.status;
		if (rec.status === "PRESENT") {
			totalAttendanceMap[rec.employeeId] =
				(totalAttendanceMap[rec.employeeId] || 0) + 1;
		}
	}

	return { employees, days, attendanceMap, totalAttendanceMap };
}

export default async function AttendancePage({
	searchParams,
}: {
	searchParams: { month?: string; year?: string };
}) {
	const today = toZonedTime(new Date(), timeZone);
	const year = Number(searchParams.year) || today.getFullYear();
	const month = Number(searchParams.month) || today.getMonth() + 1;

	if (month < 1 || month > 12 || year < 2000) {
		redirect("/attendance"); // fallback if params are invalid
	}

	const { employees, days, attendanceMap, totalAttendanceMap } =
		await getMonthlyAttendance(year, month);

	return (
		<>
			<div className="dashboard w-screen px-8 py-4 bg-gray-200 flex items-center justify-between">
				<h3 className="text-3xl">Admin</h3>
				<LogoutButton />
			</div>
			<main className="p-4 overflow-auto">
				<Link href="/admin/manage-employees">
					<Button variant="outline" className="mb-4 cursor-pointer">
						Manage Employees
					</Button>
				</Link>
				<h1 className="text-xl font-bold mb-4">
					Attendance Table – {format(new Date(year, month - 1), "MMMM yyyy")}
				</h1>

				<div className="mb-4">
					<form method="get" className="flex gap-2">
						<select
							name="month"
							defaultValue={month}
							className="border px-2 py-1"
						>
							{Array.from({ length: 12 }, (_, i) => (
								<option key={i + 1} value={i + 1}>
									{format(new Date(2000, i), "MMMM")}
								</option>
							))}
						</select>
						<input
							type="number"
							name="year"
							min="2000"
							max="2100"
							defaultValue={year}
							className="border px-2 py-1 w-24"
						/>
						<button
							type="submit"
							className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
						>
							Go
						</button>
					</form>
				</div>

				{/* <div className="mb-4">
				<p className="text-sm text-gray-600">
					Showing attendance for{" "}
					{format(new Date(year, month - 1), "MMMM yyyy")}
				</p>
			</div> */}
				<div className="overflow-x-auto w-full">
					<table className="border border-gray-300 text-sm">
						<thead className="bg-gray-100 sticky top-0">
							<tr>
								<th className="border px-2 py-1 text-left sticky left-0 bg-[#f3f4f6] z-10">
									Employee
								</th>
								<th className="border px-2 py-1 text-left">Action</th>

								{days.map((day: any) => (
									<th
										key={day.toISOString()}
										className="border px-2 py-1 text-center"
									>
										{format(day, "dd")}
									</th>
								))}

								<th className="border px-2 py-1 text-left">Total</th>
							</tr>
						</thead>
						<tbody>
							{employees.map((emp) => (
								<tr key={emp.id}>
									<td className="border px-2 py-1 sticky left-0 bg-[#f3f4f6] z-10">
										{emp.name}
									</td>
									<td className="border px-2 py-1">
										{attendanceMap[emp.id]?.[
											format(toZonedTime(new Date(), timeZone), "yyyy-MM-dd")
										] == undefined ? (
											<PunchButton employeeId={emp.id} />
										) : (
											"Already Marked"
										)}
									</td>

									{days.map((day: any) => {
										const dayStr = format(day, "yyyy-MM-dd");
										const status = attendanceMap[emp.id]?.[dayStr] ?? "-";
										return (
											<td key={dayStr} className="border px-2 py-1 text-center">
												{status[0]}
											</td>
										);
									})}
									<td className="border px-2 py-1">
										{totalAttendanceMap[emp.id]}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
