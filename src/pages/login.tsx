import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function LoginPage() {
	// Using react Form
	// useForm type -> CreatUserInput from user.schema.ts
	const { handleSubmit, register } = useForm<CreateUserInput>();
	//note register value is something created by useForm

	const router = useRouter();

	// Most cases you will use mutate
	// const { mutate, mutateAsync, error } = trpc.useMutation(
	// 	[
	// 		//trpc ->  ./utils -> createRouter -> app.router -> user.router
	// 		"users.register-user",
	// 	],
	// 	{
	// 		onSuccess: () => {
	// 			router.push("/login");
	// 		},
	// 	}
	// );

	// onSubmit make sure the values are good types of CreateUserInput
	function onSubmit(values: CreateUserInput) {
		// mutate(values);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {error && error.message} */}
			</form>
			<h1>Login</h1>

			<input
				type="email"
				placeholder="jane.doe@example.com"
				{...register("email")}
			/>

			<button type="submit">Login</button>
			<Link href="/register">Register</Link>
		</>
	);
}

export default LoginPage;
