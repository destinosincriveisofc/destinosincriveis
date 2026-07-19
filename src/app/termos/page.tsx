import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Termos de Uso | Destinos Incríveis',
  description: 'Termos e condições de uso do site Destinos Incríveis e do Club Dija. Leia atentamente antes de contratar nossos serviços.',
  openGraph: {
    title: 'Termos de Uso | Destinos Incríveis',
    description: 'Termos e condições de uso do site Destinos Incríveis e do Club Dija.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
  },
};

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Termos de Uso</h1>
          <p className={styles.lastUpdate}>Última atualização: julho de 2026</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Aceitação dos Termos</h2>
            <p className={styles.text}>
              Ao acessar e utilizar os serviços do Destinos Incríveis e do Club Dija, você declara
              ter lido, compreendido e aceitado todos os termos e condições descritos neste documento.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Serviços Oferecidos</h2>
            <p className={styles.text}>
              O Destinos Incríveis é uma plataforma de inteligência de viagens que monitora
              tarifas aéreas e de hospedagem, enviando alertas de oportunidades e erros tarifários
              para seus assinantes através de grupos no WhatsApp e notificações no navegador.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Assinatura do Club Dija</h2>
            <p className={styles.text}>
              A assinatura do Club Dija tem valor mensal de R$ 9,90 e dá acesso a grupos exclusivos
              no WhatsApp com alertas de passagens e hotéis com desconto. O pagamento é processado
              através da plataforma Kiwify. O cancelamento pode ser solicitado a qualquer momento,
              sem multa ou carência, diretamente pelo painel da Kiwify ou através do suporte.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Isenção de Responsabilidade</h2>
            <p className={styles.text}>
              O Destinos Incríveis atua como um agregador e curador de ofertas de viagem.
              Não somos uma agência de viagens, companhia aérea, hotel ou qualquer outro prestador
              de serviço turístico. As compras são realizadas diretamente nos sites das companhias
              aéreas, hotéis ou consolidadoras parceiras. Não nos responsabilizamos por alterações
              de preço, cancelamentos de passagens, políticas de reembolso ou quaisquer outros
              termos aplicados pelos fornecedores terceiros.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Privacidade e Dados Pessoais</h2>
            <p className={styles.text}>
              O tratamento dos seus dados pessoais é realizado conforme descrito em nossa Política
              de Privacidade. Ao contratar nossos serviços, você consente com a coleta e uso dos
              seus dados para as finalidades descritas na referida política.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Propriedade Intelectual</h2>
            <p className={styles.text}>
              Todo o conteúdo do site, incluindo textos, imagens, logotipos e código-fonte, é de
              propriedade do Destinos Incríveis ou de seus licenciadores, sendo vedada a reprodução
              sem autorização prévia por escrito.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Disposições Gerais</h2>
            <p className={styles.text}>
              Estes termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca
              de São Paulo, SP, para dirimir quaisquer controvérsias oriundas deste instrumento.
              Caso alguma disposição seja considerada inválida, as demais permanecerão em pleno
              vigor.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
