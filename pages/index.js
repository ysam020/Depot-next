import React from "react";
import Head from "next/head";
import HomeBanner from "@/components/home-components/HomeBanner";
import HomeShop from "@/components/home-components/HomeShop";

export default function Home() {
  return (
    <>
      <Head>
        <title>Depot - Home</title>
      </Head>
      <div className="homepage">
        <HomeBanner />
        <HomeShop />
      </div>
    </>
  );
}
