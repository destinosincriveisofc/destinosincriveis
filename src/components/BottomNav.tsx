"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, Brain, User, Home, Star, Check } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/explorar', label: 'Explorar', icon: Compass },
  { href: '/destinos', label: 'Mapa', icon: Map },
  { href: '/dija-ai', label: 'DIJA', icon: Brain },
  { href: '/dashboard', label: 'Perfil', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="bottomNav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottomNavItem ${isActive ? 'bottomNavItemActive' : ''} ${item.href === '/explorar' ? 'bottomNavCta' : ''}`}
            >
              <Icon size={20} />
              <span className="bottomNavLabel">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Club CTA Bar */}
      <div className="lg:hidden fixed bottom-[72px] left-0 right-0 z-40 px-4 pb-2 pointer-events-none">
        <Link
          href="/club"
          className="pointer-events-auto flex items-center justify-between gap-2 w-full px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--brand-gold)] to-amber-600 text-white shadow-lg shadow-amber-600/20 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2">
            <Star size={16} />
            <span className="text-sm font-extrabold">Club DIJA</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1">
              <Check size={12} /> DIJA AI
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} /> Comunidade
            </span>
            <span className="flex items-center gap-1">
              <Check size={12} /> Alertas VIP
            </span>
          </div>
          <span className="text-sm font-extrabold bg-white/20 px-3 py-1 rounded-full">
            R$ 9,90
          </span>
        </Link>
      </div>
    </>
  );
}
