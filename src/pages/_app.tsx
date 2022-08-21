import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { AppRouter } from "../server/route/app.router";
import { url } from "../utils/constants";
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
	const { data, error, isLoading } = trpc.useQuery(["users.me"]);

	if (isLoading) {
		return <>Loading user...</>;
	}

	return (
		<UserContextProvider value={data}>
			<main>
				<Component {...pageProps} />
			</main>
		</UserContextProvider>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		const links = [
			loggerLink(),
			httpBatchLink({
				maxBatchSize: 10,
				url: url,
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
})(MyApp);

// adding (MyApp) for our app to execute with TRPC
