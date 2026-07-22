"use client";

import React from 'react';
import { Calendar, Heart, Compass, CompassIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  location: string;
  duration: string;
  description: string;
  imageUrl: string;
  category: string;
  matchScore?: number;
}

export default function ExperienceCard({
  title,
  location,
  duration,
  description,
  imageUrl,
  category,
  matchScore = 98,
}: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex-none w-[280px] sm:w-[340px] md:w-[400px] h-[260px] rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-white/5 bg-surface"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-primary-bg/50 to-transparent" />
      </div>

      {/* Heart Action */}
      <button className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-primary-bg/70 hover:bg-brand-blue/20 hover:text-brand-blue backdrop-blur-md flex items-center justify-center text-white transition-all">
        <Heart size={14} />
      </button>

      {/* Info labels */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-blue text-primary-bg">
          {category}
        </span>
        {matchScore && (
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-gold/10 text-brand-gold border border-brand-gold/20 backdrop-blur-md">
            {matchScore}% Recom.
          </span>
        )}
      </div>

      {/* Bottom Info */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 flex flex-col justify-end">
        <span className="text-xs text-brand-blue font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
          <Compass size={12} />
          {location}
        </span>
        <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-blue transition-colors duration-300">
          {title}
        </h4>
        <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 h-0 group-hover:h-8 group-hover:mt-1">
          {description}
        </p>
        <span className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
          <Calendar size={10} />
          Duração: {duration}
        </span>
      </div>
    </motion.div>
  );
}
