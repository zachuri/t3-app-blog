import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { resolve } from "path";
import {
	createUserOutputScheme,
	createUserSchema,
	requestOtpSchema,
} from "../../schema/user.schema";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";
import { url } from "../../utils/constants";
import { encode } from "../../utils/base64";

export const userRouter = createRouter()
	.mutation("register-user", {
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
	})
	.mutation("request-otp", {
		input: requestOtpSchema,
		async resolve({ input, ctx }) {
			const { email, redirect } = input;

			const user = await ctx.prisma.user.findUnique({
				where: {
					email,
				},
			});

			if (!user) {
				throw new trpc.TRPCError({
					code: "NOT_FOUND",
					message: "User not found",
				});
			}

			const token = await ctx.prisma.loginToken.create({
				data: {
					redirect,
					user: {
						connect: {
							id: user.id,
						},
					},
				},
			});

			// use await to catch errors(will take longer)
			// await sendLoginEmail({
			sendLoginEmail({
				token: encode(`${token.id}:${user.email}`),
				url: url,
				email: user.email,
			});

			// send email to user
			return true;
		},
	});
