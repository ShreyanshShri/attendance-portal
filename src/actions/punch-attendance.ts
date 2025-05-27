// app/actions/punchAttendance.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { toZonedTime } from "date-fns-tz";

const timeZone = "Asia/Kolkata";

export async function punchAttendance(employeeId: string) {
	const today = toZonedTime(new Date(), timeZone);
	const startOfDay = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate()
	);

	const existing = await prisma.attendance.findFirst({
		where: {
			employeeId,
			date: {
				gte: startOfDay,
				lt: toZonedTime(
					new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000),
					timeZone
				),
			},
		},
	});

	if (existing) {
		throw new Error("Attendance already punched for today.");
	}

	await prisma.attendance.create({
		data: {
			employeeId,
			date: toZonedTime(new Date(), timeZone),
			status: "PRESENT", // or handle logic to determine this
		},
	});

	revalidatePath("/attendance"); // to refresh the table view
}
