import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";
import dynamic from "next/dynamic";

// Made our component LoginForm dynamic to be able to obtain
// data from the server dynamically
const LoginForm = dynamic(() => import("../components/LoginForm"), {
	ssr: false,
});

function LoginPage() {
	return (
		<div>
			<LoginForm />
		</div>
	);
}

export default LoginPage;
