"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEmployee(_prevState: string, formData: FormData) {
	const employee = await prisma.employee.create({
		data: {
			name: formData.get("name") as string,
			user: {
				create: {
					email: formData.get("email") as string,
					role: "EMPLOYEE",
				},
			},
		},
	});

	if (!employee) {
		return "Failed to create employee";
	}

	revalidatePath("/admin/manage-employees");
	redirect("/admin");
}
