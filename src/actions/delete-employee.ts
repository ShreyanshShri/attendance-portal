"use server";

import { prisma } from "@/lib/prisma";

export async function deleteEmployee(employeeId: string) {
	// Delete the related User first (because of foreign key constraint)
	await prisma.user.deleteMany({
		where: { employeeId },
	});

	// Then delete the Employee
	await prisma.employee.delete({
		where: { id: employeeId },
	});
}
