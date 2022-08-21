import { createRouter } from "../createRouter";

export const postRouter = createRouter()
	.mutation("create-post", {})
	.query("posts", {})
  .query("single-post", {});
