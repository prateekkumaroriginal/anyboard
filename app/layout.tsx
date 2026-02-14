import type { Metadata } from "next";
import { JetBrains_Mono, Archivo_Black } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/convex-provider";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const archivo = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnyBoard — Define. Connect. Visualize.",
  description: "Your data, your sources, your dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en" className="dark">
        <body className={`${jetbrains.className} ${jetbrains.variable} ${archivo.variable} antialiased`}>
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
