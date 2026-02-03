import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anyboard",
  description: "No-code, API-first dashboards for every team."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
