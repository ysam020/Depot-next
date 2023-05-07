import "@/styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import combineReducers from "../reducers/rootReducer";
import { legacy_createStore as createStore } from "redux";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const store = createStore(combineReducers);

export default function App({ Component, pageProps }) {
  console.log(pageProps.session);
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Depot</title>
        </Head>
        <Provider store={store}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SessionProvider>
    </>
  );
}
