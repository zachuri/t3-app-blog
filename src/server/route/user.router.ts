import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { resolve } from "path";
import {
	createUserOutputScheme,
	createUserSchema,
	requestOtpSchema,
	verifyOtpSchema,
} from "../../schema/user.schema";
import { sendLoginEmail } from "../../utils/mailer";
import { createRouter } from "../createRouter";
import { baseUrl, url } from "../../utils/constants";
import { encode } from "../../utils/base64";
import { decode } from "jsonwebtoken";
import { singJwt } from "../../utils/jwt";
import { serialize } from "cookie";

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
				// Note this function is being used from util/mailer
				//  here we create the token and send it our user
				token: encode(`${token.id}:${user.email}`),
				url: baseUrl,
				email: user.email,
			});

			// send email to user
			return true;
		},
	})
	.query("verify-top", {
		input: verifyOtpSchema,
		async resolve({ input, ctx }) {
			const decoded = decode(input.hash)?.split(":");
			const [id, email] = decoded;

			const token = await ctx.prisma.loginToken.findFirst({
				where: {
					id,
					user: {
						email,
					},
				},
				include: {
					user: true,
				},
			});

			if (!token) {
				throw new trpc.TRPCError({
					code: "FORBIDDEN",
					message: "Invalid token",
				});
			}

			// Function in util to create jwt
			const jwt = singJwt({
				email: token.user.email,
				id: token.user.id,
			});

			ctx.res.setHeader(
				"Set-Cookie",
				serialize("token", jwt, { path: "/" })
			);

			return {
				redirect: token.redirect,
			};
		},
	});
