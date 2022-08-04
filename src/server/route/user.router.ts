import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import {
	createUserOutputScheme,
	createUserSchema,
} from "../../schema/user.schema";
import { createRouter } from "../createRouter";

export const userRouter = createRouter().mutation("register-user", {
	input: createUserSchema, // this will validate our input
	// output: createUserOutputScheme,

	async resolve({ ctx, input }) {
		// reslover gets and input

		//validation checking from input in createUserScehema
		const { email, name } = input;

		try {
			const user = await ctx.prisma.user.create({
				data: {
					email,
					name,
				},
			});

			return user;
		} catch (e) {
			//Checks is user already exists
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new trpc.TRPCError({
						code: "CONFLICT",
						message: "User already exists",
					});
				}
			}

			// if error not part of Prisma Error ->
			throw new trpc.TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Something went wrong",
			});
		}
	},
});
