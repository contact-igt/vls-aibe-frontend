import Footer from "@/common/Footer";
import Header from "@/common/Header";
import useUTMSource from "@/hooks/useUTMSource";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  useUTMSource();
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
