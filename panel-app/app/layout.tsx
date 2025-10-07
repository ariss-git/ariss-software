import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "ARISS - Dashboard",
  description: "Developed by Saad Sayyed",
  icons: {
    icon: "/Ariss_Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-work antialiased flex h-screen overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 lg:overflow-y-auto lg:p-6 lg:ml-60">
          {children}
        </main>
      </body>
    </html>
  );
}
