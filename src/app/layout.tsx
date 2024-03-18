import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Footer from "@/app/components/footer";
import NavbarTop from "@/app/components/navbar";
import ExpressNews from "./components/expressNews";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TotalNews",
  description: "Noticias generadas por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <Providers>
          <NavbarTop/>
          <div className="flex flex-col min-h-screen justify-between p-10">
            <ExpressNews />
            {children}
            <Footer />
            <SpeedInsights />
            <Analytics />
          </div>
        </Providers>
      </body>
    </html>
  );
}
