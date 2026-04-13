import Footer from "@/common/Footer";
import Header from "@/common/Header";
import useUTMSource from "@/hooks/useUTMSource";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "@/styles/globals.css";
import Announcement from "@/common/Announcement";
import { HomePageConstant } from "@/constant/Home";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  useUTMSource();
  return (
    <>
      <Head>
        <title>VLS Law Academy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* <Header /> */}
      <Announcement announce={HomePageConstant?.homeBanner?.marquee}/>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
