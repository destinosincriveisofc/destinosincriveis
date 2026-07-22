"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'gold' | 'green' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const styles = {
    blue: 'bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border-[var(--brand-blue-border)]',
    gold: 'bg-[var(--brand-gold-light)] text-[var(--brand-gold)] border-[var(--brand-gold-border)]',
    green: 'bg-[var(--brand-green-light)] text-[var(--brand-green)] border-[var(--brand-green-border)]',
    gray: 'bg-[var(--bg-surface)] text-[var(--text-muted)] border-[var(--border-default)]',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary: 'bg-[var(--brand-gold)] text-white shadow-[var(--shadow-btn-gold)] hover:bg-[var(--brand-gold-hover)] active:scale-[0.98]',
    secondary: 'bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-hover)] active:scale-[0.98]',
    outline: 'border border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)] active:scale-[0.98]',
    ghost: 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]',
  };

  const sizes = {
    sm: 'px-4 py-2 rounded-lg text-xs gap-1.5',
    md: 'px-5 py-2.5 rounded-full text-sm gap-2',
    lg: 'px-8 py-4 rounded-full text-base gap-2.5',
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={buttonClass}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const styles = 'bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] transition-all';
  const hoverStyles = hover ? 'hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 cursor-pointer' : '';

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className={`${styles} ${hoverStyles} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${styles} ${hoverStyles} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto px-6 w-full ${className}`}>
      {children}
    </div>
  );
}
