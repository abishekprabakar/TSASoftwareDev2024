import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <MTThemeProvider>
          <Component {...pageProps} />
        </MTThemeProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}
