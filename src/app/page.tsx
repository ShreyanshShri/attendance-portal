import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
	return (
		<main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
			<h1 className="text-4xl font-bold mb-4 text-gray-800">
				Attendance Portal
			</h1>
			<p className="text-lg text-gray-600 mb-8">
				Simple employee attendance tracking made easy.
			</p>
			<Link href="/login">
				<Button className="px-6 py-3 text-lg cursor-pointer">Login</Button>
			</Link>
		</main>
	);
}
