import { NextApiRequest, NextApiResponse } from "next";

// Function used later on to build our user

export function createContext({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	return { req, res };
}

export type Context = ReturnType<typeof createContext>;
