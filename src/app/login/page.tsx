import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loginform from "@/components/login/LoginForm";

export default function Login() {
	return (
		<div className="w-screen h-screen flex justify-center items-center font-[family-name: var('--font-open-sans-regular')]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Admin Login</CardTitle>
				</CardHeader>
				<CardContent>
					<Loginform />
				</CardContent>
			</Card>
		</div>
	);
}
