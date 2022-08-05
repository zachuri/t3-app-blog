// base url
export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
	? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
	: "http://localhost:3000/";

// url to be able to call our api
export const url = `${baseUrl}/api/trpc`;
