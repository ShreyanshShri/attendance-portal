"use client";

import { logout } from "@/actions/logout";
import { useTransition } from "react";
import { Button } from "../ui/button";

export default function LogoutButton() {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			onClick={() => startTransition(() => logout())}
			variant="outline"
			disabled={isPending}
			className="cursor-pointer"
		>
			{isPending ? "Logging out..." : "Logout"}
		</Button>
	);
}
