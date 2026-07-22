"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Compass,
  Users,
  Sparkles,
  BookOpen,
  UserCircle,
  LogOut,
  Bell,
  User,
} from 'lucide-react';
import styles from './page.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  let activeTitle = "Dashboard";
  if (pathname === '/dashboard/explorar') activeTitle = "Explorar Destinos";
  else if (pathname === '/dashboard/comunidade') activeTitle = "Comunidade";
  else if (pathname === '/dashboard/guia') activeTitle = "DIJA AI";
  else if (pathname === '/dashboard/dicas') activeTitle = "Dicas";
  else if (pathname === '/dashboard/perfil') activeTitle = "Perfil";

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <span className={styles.sidebarLogoBox}>DI</span>
            <span className={styles.sidebarLogoText}>Destinos Incriveis</span>
          </div>
        </div>

        <nav className={styles.menu}>
          <Link
            href="/dashboard"
            className={`${styles.menuItem} ${pathname === '/dashboard' ? styles.active : ''}`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/explorar"
            className={`${styles.menuItem} ${pathname === '/dashboard/explorar' ? styles.active : ''}`}
          >
            <Compass size={20} />
            <span>Explorar Destinos</span>
          </Link>
          <Link
            href="/dashboard/comunidade"
            className={`${styles.menuItem} ${pathname === '/dashboard/comunidade' ? styles.active : ''}`}
          >
            <Users size={20} />
            <span>Comunidade</span>
          </Link>
          <Link
            href="/dashboard/guia"
            className={`${styles.menuItem} ${pathname === '/dashboard/guia' ? styles.active : ''}`}
          >
            <Sparkles size={20} />
            <span>DIJA AI</span>
          </Link>
          <Link
            href="/dashboard/dicas"
            className={`${styles.menuItem} ${pathname === '/dashboard/dicas' ? styles.active : ''}`}
          >
            <BookOpen size={20} />
            <span>Dicas</span>
          </Link>
          <Link
            href="/dashboard/perfil"
            className={`${styles.menuItem} ${pathname === '/dashboard/perfil' ? styles.active : ''}`}
          >
            <UserCircle size={20} />
            <span>Perfil</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              <User size={18} />
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.nome || "Carregando..."}</p>
              <span className={styles.userRole}>Membro</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerTitleContainer}>
            <h1 className={styles.headerTitle}>{activeTitle}</h1>
            <p className={styles.headerSubtitle}>
              Bem-vindo, {user?.nome || "Membro"}!
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.bellIconWrapper}>
              <Bell size={20} />
              <span className={styles.bellBadge} />
            </div>
          </div>
        </header>

        <div className={styles.tabContainer}>
          {children}
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className={styles.bottomNav}>
        <Link
          href="/dashboard"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard' ? styles.active : ''}`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/dashboard/explorar"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard/explorar' ? styles.active : ''}`}
        >
          <Compass size={20} />
          <span>Explorar</span>
        </Link>
        <Link
          href="/dashboard/comunidade"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard/comunidade' ? styles.active : ''}`}
        >
          <Users size={20} />
          <span>Comunidade</span>
        </Link>
        <Link
          href="/dashboard/guia"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard/guia' ? styles.active : ''}`}
        >
          <Sparkles size={20} />
          <span>DIJA AI</span>
        </Link>
        <Link
          href="/dashboard/dicas"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard/dicas' ? styles.active : ''}`}
        >
          <BookOpen size={20} />
          <span>Dicas</span>
        </Link>
        <Link
          href="/dashboard/perfil"
          className={`${styles.bottomNavItem} ${pathname === '/dashboard/perfil' ? styles.active : ''}`}
        >
          <UserCircle size={20} />
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
}
