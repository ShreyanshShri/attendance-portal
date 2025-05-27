"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "@/actions/admin-login";
import { useActionState } from "react";

export default function Loginform() {
	const [state, loginAction, loading] = useActionState(login, "");

	return (
		<form action={loginAction}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col space-y-1.5">
					<Label htmlFor="name">Password</Label>
					<Input
						name="password"
						type="password"
						placeholder="Enter Your Password"
					/>
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
				{loading ? "Logging In..." : "Login"}
			</Button>
		</form>
	);
}
