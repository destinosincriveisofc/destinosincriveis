"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Plane, BookOpen, Brain, Star } from 'lucide-react';

const navItems = [
  { href: '/explorar', label: 'Explorar', icon: Compass },
  { href: '/destinos', label: 'Destinos', icon: Plane },
  { href: '/guias', label: 'Guias', icon: BookOpen },
  { href: '/dija-ai', label: 'DIJA AI', icon: Brain },
  { href: '/club', label: 'Clube', icon: Star },
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
            className={`bottomNavItem ${isActive ? 'bottomNavItemActive' : ''} ${item.href === '/club' ? 'bottomNavCta' : ''}`}
          >
            <Icon size={20} />
            <span className="bottomNavLabel">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
