import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Container from "./Container";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EventHQ - Simplifying Event Management",
  description: "Book and manage events seamlessly with EventHQ's intuitive platform.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <NavBar />
          <Container className="py-10">
            {children}
          </Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
