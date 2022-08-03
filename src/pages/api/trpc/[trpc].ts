// in .node_modules/server/adapters -> other server adapters like express, aws-lambada etc you can use
// this example we are using next
import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "../../../server/createContext";
import { appRouter } from "../../../server/route/app.router";

// next route handler
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: createContext,
	onError({ error }) {
		if (error.code === "INTERNAL_SERVER_ERROR") {
			console.error("Something went wrong", error); //use console.error instead of console.log
		} else {
			console.error(error);
		}
	},
});
