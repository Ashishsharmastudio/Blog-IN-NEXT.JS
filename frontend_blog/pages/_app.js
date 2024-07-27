import "@/styles/globals.css";
import Header from "@/components/Header";
import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import ScrollToTopBtn from "@/components/scrollToTopBtn";

export default function App({ Component, pageProps }) {
  return <>
    <Header />
    <main>
      <Aos>
        <Component {...pageProps} />
      </Aos>
      <ScrollToTopBtn/>
    </main>
    <Footer/>
  </>
}
