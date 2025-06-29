import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import Header from "~/components/Header";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JS Pros",
  description: "Not Another Course members site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
} 