import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import PushRegister from "@/components/PushRegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Destinos Incríveis | Clube de Viagens Inteligente",
  description: "A plataforma de inteligência de viagens que monitora promoções, alerta erros tarifários e te ajuda a viajar pagando até 60% menos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5BA4CF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Destinos Incríveis" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <PushRegister />
        {children}
      </body>
    </html>
  );
}
