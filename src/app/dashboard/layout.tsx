"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { 
  Home, 
  Plane, 
  Users, 
  BookOpen, 
  LogOut, 
  Bell, 
  User,
  Compass
} from 'lucide-react';
import styles from './page.module.css';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'dashboard';

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Determine active tab title
  let activeTitle = "Painel Geral";
  if (pathname === '/dashboard/comunidade') {
    activeTitle = "Comunidade Social";
  } else if (pathname === '/dashboard/guia') {
    activeTitle = "Guia de Bolso VIP";
  } else if (pathname === '/dashboard/ofertas') {
    activeTitle = "Vitrine Secreta VIP";
  } else if (pathname === '/dashboard') {
    if (tab === 'offers') activeTitle = "Ofertas de Viagens VIP";
    if (tab === 'tips') activeTitle = "Dicas & Notícias";
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/logo-oficial.jpg" alt="Logo" className={styles.sidebarLogoImage} />
          <h2 className={styles.sidebarLogoText}>CLUB DIJA</h2>
        </div>

        <nav className={styles.menu}>
          <Link 
            href="/dashboard" 
            className={`${styles.menuItem} ${pathname === '/dashboard' && tab === 'dashboard' ? styles.active : ''}`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/dashboard/ofertas" 
            className={`${styles.menuItem} ${pathname === '/dashboard/ofertas' ? styles.active : ''}`}
          >
            <Plane size={20} />
            <span>Ofertas VIP</span>
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
            <Compass size={20} />
            <span>Guia de Bolso VIP</span>
          </Link>
          <Link 
            href="/dashboard?tab=tips" 
            className={`${styles.menuItem} ${pathname === '/dashboard' && tab === 'tips' ? styles.active : ''}`}
          >
            <BookOpen size={20} />
            <span>Dicas & Notícias</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatarWrapper}>
              <User size={18} />
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.nome || "Carregando..."}</p>
              <span className={styles.userRole}>VIP Member</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerTitleContainer}>
            <h1 className={styles.headerTitle}>{activeTitle}</h1>
            <p className={styles.headerSubtitle}>
              Seja bem-vindo, {user?.nome || "Membro"}!
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.bellIconWrapper}>
              <Bell size={20} />
              <span className={styles.bellBadge}></span>
            </div>
          </div>
        </header>

        {/* Tab/Page Content */}
        <div className={styles.tabContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div style={{ padding: '20px', color: '#ffffff' }}>Carregando...</div>}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
