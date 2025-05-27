import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.some((protectedPath) =>
		path.startsWith(protectedPath)
	);
	const isPublicRoute = publicRoutes.includes(path);

	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	const session = await decrypt(cookie);

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	if (isPublicRoute && session?.userId) {
		return NextResponse.redirect(new URL("/admin", req.nextUrl));
	}

	return NextResponse.next();
}
