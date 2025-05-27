"use server";

import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function login(_prevState: string, formData: FormData) {
	const admin = await prisma.user.findUnique({
		where: { email: "admin@example.com" },
	});

	// compare the passwords
	const isPasswordCorrect = await bcrypt.compare(
		formData.get("password") as string,
		admin?.password as string
	);

	if (!isPasswordCorrect) {
		return "Incorrect Password";
	}

	await createSession(admin?.id as string);

	redirect("/admin");
}

export async function logout(_prevState: string, _formData: FormData) {
	try {
		await deleteSession();
	} catch (err) {
		return "";
	}
	redirect("/login");
}
