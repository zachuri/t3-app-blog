import { createPostSchema, getSinglePostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";

export const postRouter = createRouter()
	.mutation("create-post", {
		input: createPostSchema,
		async resolve() {},
	})
	.query("posts", {
		resolve() {},
	})
	.query("single-post", { 
    input: getSinglePostSchema
		resolve() {},
   });
