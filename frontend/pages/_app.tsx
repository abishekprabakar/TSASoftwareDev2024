import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <MTThemeProvider>
        <Component {...pageProps} />
      </MTThemeProvider>
    </ThemeProvider>
  );
}
