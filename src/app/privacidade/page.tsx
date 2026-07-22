import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Destinos Incríveis',
  description: 'Política de privacidade do Destinos Incríveis e Club Dija em conformidade com a LGPD. Saiba como tratamos seus dados pessoais.',
  openGraph: {
    title: 'Política de Privacidade | Destinos Incríveis',
    description: 'Política de privacidade do Destinos Incríveis e Club Dija em conformidade com a LGPD.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Política de Privacidade</h1>
          <p className={styles.lastUpdate}>Última atualização: julho de 2026</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Dados Coletados</h2>
            <p className={styles.text}>
              Coletamos as seguintes informações pessoais quando você utiliza nossos serviços:
              nome, endereço de e-mail, número de telefone (WhatsApp), dados de navegação
              (cookies, páginas visitadas, tempo de sessão) e informações de pagamento
              processadas exclusivamente pela plataforma Kiwify.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Finalidade do Tratamento</h2>
            <p className={styles.text}>
              Seus dados são utilizados para: (a) envio de alertas de passagens promocionais
              e erros tarifários via WhatsApp; (b) criação e gestão da sua conta de assinante;
              (c) melhoria da experiência de navegação; (d) comunicação de novidades e ofertas
              relacionadas aos nossos serviços; e (e) cumprimento de obrigações legais e
              regulatórias.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Compartilhamento com Terceiros</h2>
            <p className={styles.text}>
              Não vendemos seus dados pessoais para terceiros. Compartilhamos informações
              estritamente necessárias com: (a) Kiwify (processamento de pagamentos);
              (b) provedores de infraestrutura de hospedagem e envio de mensagens; e
              (c) autoridades competentes quando exigido por lei.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Direitos do Titular (LGPD)</h2>
            <p className={styles.text}>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você
              tem direito a: (a) confirmar a existência de tratamento de dados; (b) acessar
              seus dados; (c) corrigir dados incompletos, inexatos ou desatualizados;
              (d) anonimatar, bloquear ou eliminar dados desnecessários; (e) portar dados
              a outro fornecedor; (f) eliminar dados tratados com seu consentimento; e
              (g) revogar o consentimento a qualquer tempo.
            </p>
            <p className={styles.text}>
              Para exercer seus direitos, entre em contato pelo e-mail{' '}
              <a href="mailto:suporte@destinosincriveis.com.br" className={styles.link}>
                suporte@destinosincriveis.com.br
              </a>.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Cookies e Tecnologias</h2>
            <p className={styles.text}>
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos
              para melhorar sua experiência. Você pode gerenciar as preferências de cookies
              nas configurações do seu navegador.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Segurança dos Dados</h2>
            <p className={styles.text}>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
              pessoais contra acesso não autorizado, destruição, perda, alteração ou
              divulgação indevida, incluindo criptografia SSL/TLS em todas as comunicações.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Retenção e Eliminação</h2>
            <p className={styles.text}>
              Seus dados serão mantidos pelo período necessário à prestação dos serviços ou
              conforme exigido por lei. Após o cancelamento da assinatura, os dados serão
              eliminados em até 90 dias, salvo quando houver obrigação legal de retenção.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Contato com o Encarregado (DPO)</h2>
            <p className={styles.text}>
              Para questões relacionadas à privacidade e proteção de dados, entre em contato
              com nosso Encarregado pelo e-mail{' '}
              <a href="mailto:suporte@destinosincriveis.com.br" className={styles.link}>
                suporte@destinosincriveis.com.br
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
