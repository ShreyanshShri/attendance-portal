import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loginform from "@/components/login/LoginForm";
import CreateUserForm from "@/components/admin/CreateUserForm";

export default function CreateUser() {
	return (
		<div className="w-screen h-screen flex justify-center items-center font-[family-name: var('--font-open-sans-regular')]">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Add New User</CardTitle>
				</CardHeader>
				<CardContent>
					<CreateUserForm />
				</CardContent>
			</Card>
		</div>
	);
}
