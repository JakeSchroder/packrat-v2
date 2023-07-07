import "@/styles/globals.css";
import { Montserrat_Alternates } from "next/font/google";

const monserrat_alt = Montserrat_Alternates({
  subsets: ["latin"],
  variable: "--font-montserrat-alt",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${monserrat_alt.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
