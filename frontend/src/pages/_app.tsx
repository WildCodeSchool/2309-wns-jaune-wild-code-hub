import theme from "../styles/theme/index";
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { API_URL } from "@/config";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import Footer from "@/components/Footer";
import ToastProvider from "../components/ToastCustom/ToastProvider";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const client = new ApolloClient({
    uri: `${API_URL}`,
    cache: new InMemoryCache(),
    credentials: "include",
  });
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <ToastProvider />
        {getLayout(<Component {...pageProps} />)}
        <Footer />
      </ChakraProvider>
    </ApolloProvider>
  );
}
