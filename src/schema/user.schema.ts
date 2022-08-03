import z from "zod";

// zod is for schema validation for types
export const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(), //validate its a string and email (simple)
	// email: z.string().optional(), // if you want optional
});

export const createUserOutputScheme = z.object({
	name: z.string(),
	email: z.string().email(), //validate its a string and email (simple)
});

// Explanation calling a type of CreateUserInput from the return
//  of the object call of createUserScehema
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
