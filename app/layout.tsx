import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./components/ClientLayout"; // import client wrapper

export const metadata: Metadata = {
  title: "Edu Store",
  description: "dev by bip",
  generator: "bip.dev",
  icons: {
    icon: "../favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>{" "}
        {/* ✅ Chạy i18n client tại đây */}
      </body>
    </html>
  );
}
