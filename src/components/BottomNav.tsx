"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Map, Brain, User, Home } from 'lucide-react';

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
  );
}
