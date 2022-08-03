import { createRouter } from "../createRouter";
import { userRouter } from "./user.router";

// App Router is the main connection between all your other routers or apis
export const appRouter = createRouter().merge("users.", userRouter);

export type AppRouter = typeof appRouter;
