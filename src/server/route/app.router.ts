import { createRouter } from "../createRouter";
import { postRouter } from "./post.router";
import { userRouter } from "./user.router";

// App Router is the main connection between all your other routers or apis
export const appRouter = createRouter()
  .merge("users.", userRouter)
  .merge("posts.", postRouter);


export type AppRouter = typeof appRouter;
