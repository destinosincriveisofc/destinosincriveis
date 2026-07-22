import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import "@/styles/tokens.css";
import PushRegister from "@/components/PushRegister";
import BottomNav from "@/components/BottomNav";
import SoundEffectProvider from "@/components/SoundEffectProvider";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";

export const metadata: Metadata = {
  title: "Destinos Incríveis | Descubra o Brasil que poucos conhecem",
  description: "Experiências únicas, roteiros inteligentes e uma comunidade inteira explorando o Brasil. Descubra seu próximo destino com a DIJA AI.",
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
      <body style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif", backgroundColor: 'var(--bg-primary)' }}>
        <PushRegister />
        <SoundEffectProvider />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
