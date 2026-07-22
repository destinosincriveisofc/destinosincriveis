"use client";

import React from 'react';
import { motion } from 'framer-motion';

// ==========================================
// 1. Badge Component
// ==========================================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'gold' | 'green' | 'red' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const styles = {
    blue: 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue',
    gold: 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold',
    green: 'bg-green-500/10 border-green-500/20 text-green-400',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
    gray: 'bg-white/5 border-white/10 text-gray-300',
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md ${styles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// 2. Button Component
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  animate = true,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-primary-bg shadow-[0_4px_14px_rgba(255,193,7,0.25)] hover:shadow-[0_6px_20px_rgba(255,193,7,0.35)]',
    secondary: 'bg-brand-blue text-primary-bg shadow-[0_4px_14px_rgba(56,189,248,0.25)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.35)]',
    outline: 'border border-brand-blue/30 hover:border-brand-blue text-brand-blue hover:bg-brand-blue/5',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 rounded-lg text-xs gap-1.5',
    md: 'px-6 py-3 rounded-full text-sm gap-2',
    lg: 'px-8 py-4 rounded-full text-base gap-2.5',
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (animate) {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={buttonClass}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}

// ==========================================
// 3. Card Component
// ==========================================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverLift?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  glow = false,
  hoverLift = true,
  onClick,
}: CardProps) {
  const baseStyles = 'rounded-3xl border border-white/5 bg-card-bg/60 backdrop-blur-md transition-all overflow-hidden';
  const glowStyles = glow ? 'shadow-[0_0_24px_rgba(56,189,248,0.1)] border-brand-blue/20' : 'shadow-2xl';
  const liftStyles = hoverLift ? 'hover:border-brand-blue/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]' : '';

  const cardClass = `${baseStyles} ${glowStyles} ${liftStyles} ${className}`;

  if (hoverLift) {
    return (
      <motion.div
        whileHover={hoverLift ? { y: -5, scale: 1.01 } : {}}
        className={cardClass}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
}

// ==========================================
// 4. Container Component
// ==========================================
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
