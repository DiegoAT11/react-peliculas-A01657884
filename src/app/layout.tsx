import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Movies App for React course",
};

//Children cualquier pagina que next nos va a renderizar
//Header se mantiene en todas las páginas
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-stone-200`}>
        <GuestSessionProvider>
          <Header />
          <main className="p-6 mt-16">{children}</main>
        </GuestSessionProvider>
      </body>
    </html>
  );
};