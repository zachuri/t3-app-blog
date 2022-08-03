import { PrismaClient } from "@prisma/client";

// if error: warn(prisma-client) There are already 10 instances of Prisma Client actively running.
// run this code and make global.prisma
declare global {
	var prisma: PrismaClient | undefined;
}

// primsa client
export const prisma = global.prisma || new PrismaClient();

// stop prisma from creating new instances when this file is called
if (process.env.NODE_ENV !== "production") {
	global.prisma = prisma;
}
