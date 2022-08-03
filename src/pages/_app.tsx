import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

// to do add appRouter to generic
export default withTRPC({
	config({ ctx }) {
		const url = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
			: "http://localhost:3000/api/trpc";

		const links = [
			loggerLink(),
			httpBatchLink({
				maxBatchSize: 10,
				url,
			}),
		];

		return {
			// url,
			queryClientConfig: {
				queries: {
					staleTime: 60,
				},
			},
			headers() {
				if (ctx?.req) {
					return {
						// get your cookies from here
						...ctx.req.headers,

						// request is done on the server
						"x-ssr": "1",
					};
				}

				// else return an empty object
				return {};
			},
			links,
			transformer: superjson, // superjson -> use native dates, maps, sets
		};
	},

	// false because we want to be able to see every
	//  single request our client is making
  
	ssr: false, //play with this setting that gives the best performance and UX

	// if true -> client will make request on the server
	//  wont be able to see those request in the network tab
});
