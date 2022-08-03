import { router } from "@trpc/server"; // helper function -> create router -> will be fully typed for us
import superjson from "superjson";

export function createRouter() {
	// todo add context to generic
	return router().transformer(superjson); //helps to not need to call .transformer on every single router we create
	// Ex. we have app.router.ts, post.router.ts, user.router.ts
}
