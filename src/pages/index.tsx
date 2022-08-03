import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
	// Example: getting hello query using trpc

	// extracting the data from the query
	// will return data, error, or isLoading
	// if either is true return a display
	const { data, error, isLoading } = trpc.useQuery(["hello"]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <div>{JSON.stringify(error)}</div>;
	}

	return <div>{JSON.stringify(data)}</div>;
};

export default Home;
