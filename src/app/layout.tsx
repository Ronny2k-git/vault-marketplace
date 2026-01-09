import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { TopBar } from "@/components/topBar";
import { getConfig } from "@/utils/configWagmi";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vault Marketplace",
  description: "Save your tokens quickly and easily",
  icons: {
    shortcut: "/website-logo.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers initialState={initialState!}>
          <TopBar /> {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
