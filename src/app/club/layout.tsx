import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assinar Club Dija | Economize R$ 4.000+ em Viagens',
  description: 'Faça parte do nosso grupo privado de monitoramento de passagens. Acesse voos VIP e salas VIP por R$ 9,90/mês.',
  openGraph: {
    title: 'Assinar Club Dija | Economize R$ 4.000+ em Viagens',
    description: 'Faça parte do nosso grupo privado de monitoramento de passagens. Acesse voos VIP e salas VIP por R$ 9,90/mês.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assinar Club Dija | Economize R$ 4.000+ em Viagens',
    description: 'Faça parte do nosso grupo privado de monitoramento de passagens. Acesse voos VIP e salas VIP por R$ 9,90/mês.',
    images: ['/og-image.png'],
  },
};

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
