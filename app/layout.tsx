import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardNavigation } from "./components/Navigation";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="icon.png" type="image/png" />
      </head>
      <UserProvider>
        <body className={`${inter.className} dark`}>
          <DashboardNavigation />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}