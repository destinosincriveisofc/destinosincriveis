"use client";

import React from 'react';
import { Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  bestSeason: string;
  profile: string;
  experienceType: string;
  onClick?: () => void;
}

export default function DestinationCard({
  name,
  description,
  imageUrl,
  bestSeason,
  profile,
  experienceType,
  onClick,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-[420px] rounded-3xl overflow-hidden border border-white/10 bg-card-bg/60 backdrop-blur-md cursor-pointer transition-all hover:border-brand-blue/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Gradients overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
        {/* Category Tag */}
        <div className="flex items-center gap-1.5 self-start mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
          <Sparkles size={12} />
          <span>{experienceType}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-brand-blue transition-colors duration-300 flex items-center gap-2">
          <MapPin size={20} className="text-brand-blue group-hover:translate-y-[-2px] transition-transform duration-300" />
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 leading-relaxed mb-5 line-clamp-2">
          {description}
        </p>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-gold" />
            <span>{bestSeason}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-brand-gold" />
            <span>{profile}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
