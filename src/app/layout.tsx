import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import "@/styles/tokens.css";
import PushRegister from "@/components/PushRegister";
import BottomNav from "@/components/BottomNav";
import SoundEffectProvider from "@/components/SoundEffectProvider";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";

export const metadata: Metadata = {
  title: "Destinos Incríveis | CLUB DIJA - Clube de Viagens Inteligente",
  description: "A plataforma de inteligência de viagens que monitora promoções, alerta erros tarifários e te ajuda a viajar pagando até 60% menos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONT_URL} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A122C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Destinos Incríveis" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-glow-container" style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <PushRegister />
        <SoundEffectProvider />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
