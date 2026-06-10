import type { Metadata } from "next";
import { Cinzel, Archivo, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medusa Studio — Onde o estilo encontra a arte.",
  description:
    "Barbearia premium, tatuagem, piercing e roupas exclusivas em Jardim Motorama, São José dos Campos.",
  keywords: ["barbearia", "tatuagem", "piercing", "São José dos Campos", "Medusa Studio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${cinzel.variable} ${archivo.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#0B0B0D] text-[#E6E6EA]">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
