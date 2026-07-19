import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Central de Ofertas | Passagens Aéreas com Erro Tarifário',
  description: 'Confira as passagens e hotéis mais baratos encontrados nas últimas horas pela nossa IA de monitoramento.',
  openGraph: {
    title: 'Central de Ofertas | Passagens Aéreas com Erro Tarifário',
    description: 'Confira as passagens e hotéis mais baratos encontrados nas últimas horas pela nossa IA de monitoramento.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Central de Ofertas | Passagens Aéreas com Erro Tarifário',
    description: 'Confira as passagens e hotéis mais baratos encontrados nas últimas horas pela nossa IA de monitoramento.',
    images: ['/og-image.png'],
  },
};

export default function OfertasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
