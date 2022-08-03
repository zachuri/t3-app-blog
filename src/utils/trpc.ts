import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "../server/route/app.router";

// when import trpc to client -> have all our type for AppRouter
// we will know what queries and mutation we have ->
// also know what those take as argumetns and what they are going to return
export const trpc = createReactQueryHooks<AppRouter>();
