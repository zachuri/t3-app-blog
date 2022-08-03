import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../utils/prisma";
// Function used later on to build our user

export function createContext({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	return { req, res, prisma };
}

export type Context = ReturnType<typeof createContext>;
