import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("admin123", 10); // Set your desired password

	const admin = await prisma.user.upsert({
		where: { email: "admin@example.com" },
		update: {
			password: hashedPassword,
		},
		create: {
			email: "admin@example.com",
			password: hashedPassword,
			role: "ADMIN",
			employee: {
				create: {
					name: "Admin User",
				},
			},
		},
	});

	console.log("Admin created:", admin);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
