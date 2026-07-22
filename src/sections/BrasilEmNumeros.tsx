"use client";

import React from 'react';
import { motion } from 'framer-motion';

const numbers = [
  { value: '27', label: 'Estados' },
  { value: '5', label: 'Biomas' },
  { value: 'Milhares de', label: 'Histórias' },
];

const items = [
  { icon: '🌊', title: 'Praias paradisíacas', desc: 'Mais de 7.000 km de costa tropical' },
  { icon: '🌿', title: 'Florestas e rios', desc: 'A maior biodiversidade do planeta' },
  { icon: '⛰️', title: 'Montanhas e serras', desc: 'Cadeias montanhosas e chapadas únicas' },
];

export default function BrasilEmNumeros() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 mb-20 text-center">
          {numbers.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight">
                {item.value}
              </span>
              <span className="text-sm md:text-base text-[var(--text-muted)] font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-lg md:text-xl text-[var(--text-secondary)] font-medium"
        >
          Um país inteiro esperando por você.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-default)]"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h4>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
