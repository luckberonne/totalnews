import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Footer from "@/app/components/footer";
import NavbarTop from "@/app/components/navbar";
import ExpressNews from "./components/expressNews";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          </div>
        </Providers>
      </body>
    </html>
  );
}
