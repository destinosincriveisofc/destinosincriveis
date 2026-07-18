"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Newspaper, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/ofertas', label: 'Ofertas', icon: Tag },
  { href: '/blog', label: 'Dicas & Notícias', icon: Newspaper },
  { href: '/checkout', label: 'Club Dija', icon: User },
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
            className={`bottomNavItem ${isActive ? 'bottomNavItemActive' : ''} ${item.href === '/checkout' ? 'bottomNavCta' : ''}`}
          >
            <Icon size={20} />
            <span className="bottomNavLabel">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
