import React from 'react';
import { Users, Award, ShieldCheck, Flame } from 'lucide-react';

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
    <section className="py-12 bg-white border-y border-[#5BA4CF]/10">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 p-2">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F4FF] flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-[#0A1628] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-[#8896A9] font-medium leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
