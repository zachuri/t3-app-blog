import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

function RegisterPage() {
	// Using react Form
	// useForm type -> CreatUserInput from user.schema.ts
	const { handleSubmit, register } = useForm<CreateUserInput>();
	//note register value is something created by useForm
	const router = useRouter();

	// Most cases you will use mutate instead of mutateAsync
	//trpc ->  ./utils -> createRouter -> app.router -> user.router
	const { mutate, error } = trpc.useMutation(["users.register-user"], {
		onSuccess: () => {
			router.push("/login");
		},
	});

	// onSubmit make sure the values are good types of CreateUserInput
	function onSubmit(values: CreateUserInput) {
		mutate(values);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{error && error.message}
				<h1>Register</h1>

				<input
					type="email"
					placeholder="jane.doe@example.com"
					{...register("email")}
				/>
				<br />
				<input type="text" placeholder="Tom" {...register("name")} />
				<button type="submit">Register</button>
			</form>

			<Link href="/login">Login</Link>
		</>
	);
}

export default RegisterPage;
