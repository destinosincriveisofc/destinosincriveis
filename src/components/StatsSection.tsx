import React from 'react';
import { Users, Award, ShieldCheck, Flame } from 'lucide-react';
import styles from './StatsSection.module.css';

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <Users className="text-[#5BA4CF]" size={28} />,
      value: "220 mil+",
      label: "Seguidores no Instagram",
    },
    {
      id: 2,
      icon: <Flame className="text-[#FFD43B]" size={28} />,
      value: "45 mil+",
      label: "Ofertas monitoradas por mês",
    },
    {
      id: 3,
      icon: <Award className="text-[#5BA4CF]" size={28} />,
      value: "15 mil+",
      label: "Membros economizando no Club",
    },
    {
      id: 4,
      icon: <ShieldCheck className="text-[#FFD43B]" size={28} />,
      value: "R$ 18 Milhões",
      label: "Economizados por nossos viajantes",
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.statCard}>
            <div className={styles.iconWrapper}>
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <span className={styles.value}>
                {stat.value}
              </span>
              <span className={styles.label}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
