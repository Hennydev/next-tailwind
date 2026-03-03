import MouseGlow from "@/component/mouseglow";
import "@/styles/globals.css";
import type { AppProps } from "next/app";


export default function App({ Component, pageProps }: AppProps) {
  return (
    
    <div className="relative bg-zinc-950 text-white  min-h-screen">
      <MouseGlow />

      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
