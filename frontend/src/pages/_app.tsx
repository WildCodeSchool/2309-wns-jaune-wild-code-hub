import theme from "../styles/theme/index";

import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
