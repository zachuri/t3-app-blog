import z from "zod";

export const createPostSchema = z.object({
	title: z.string().max(256, "Max title legnth is 356"),
	body: z.string().min(10),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;

export const getsINGLEpOSTsCHEMA = z.object({
	postId: z.string().uuid(),
});
