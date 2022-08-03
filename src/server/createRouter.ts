import { router } from "@trpc/server"; // helper function -> create router -> will be fully typed for us
import superjson from "superjson";
import { Context } from "./createContext";

export function createRouter() {
	// Context type to for each router to have a type of res & req from createContext
	return router<Context>().transformer(superjson);

	//helps to not need to call .transformer on every single router we create
	// Ex. we have app.router.ts, post.router.ts, user.router.ts
}
