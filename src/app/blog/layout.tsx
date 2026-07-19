import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jornal de Viagens | Dicas de Milhas e Hacks de Viagem',
  description: 'Aprenda a viajar de classe executiva por preço de econômica e confira dicas e notícias exclusivas de milhas e turismo.',
  openGraph: {
    title: 'Jornal de Viagens | Dicas de Milhas e Hacks de Viagem',
    description: 'Aprenda a viajar de classe executiva por preço de econômica e confira dicas e notícias exclusivas de milhas e turismo.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jornal de Viagens | Dicas de Milhas e Hacks de Viagem',
    description: 'Aprenda a viajar de classe executiva por preço de econômica e confira dicas e notícias exclusivas de milhas e turismo.',
    images: ['/og-image.png'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
