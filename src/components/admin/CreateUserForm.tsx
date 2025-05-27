"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createEmployee } from "@/actions/create-user";
import { useActionState } from "react";

export default function Loginform() {
	const [state, createEmployeeAction, loading] = useActionState(
		createEmployee,
		""
	);

	return (
		<form action={createEmployeeAction}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="name">Name</Label>
					<Input
						name="name"
						type="text"
						placeholder="Enter Name"
						required
					/>{" "}
					<br />
					<Label htmlFor="name">Email</Label>
					<Input name="email" type="email" placeholder="Enter Email" required />
				</div>
			</div>
			{state !== "" && <p className="text-[#ff0000]">{state}</p>}
			<br />
			<hr />
			<Button
				type="submit"
				className="cursor-pointer w-full"
				disabled={loading}
			>
				{loading ? "Creating..." : "Create User"}
			</Button>
		</form>
	);
}
