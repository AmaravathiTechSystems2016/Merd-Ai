import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Space_Grotesk,
} from "next/font/google";
import Head from "next/head";
import { THEME_STORAGE_KEY } from "@/lib/theme/theme";

import "./globals.css";
import { HeaderWithFade } from "@/components/modules/monitor-workspace/HeaderWithFade";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MERD AI",
  description: "Design foundation for the MERD AI intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <Head>
        <script
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var key = "${THEME_STORAGE_KEY}";
                  var stored = window.localStorage.getItem(key);
                  var preference = stored === "light" || stored === "dark" || stored === "dark-alt" || stored === "dark-alt-2" || stored === "system" ? stored : "system";
                  var system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                  var theme = preference === "system" ? system : preference;
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme === "light" ? "light" : "dark";
                } catch(error) {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.style.colorScheme = "light";
                }
              })();
            `,
          }}
        />
      </Head>
      <body className="min-h-full flex flex-col">
        <HeaderWithFade />
        {children}
      </body>
    </html>
  );
}
