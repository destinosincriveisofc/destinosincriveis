import React from 'react';
import { Calendar, PlaneTakeoff, Tag, ArrowRight } from 'lucide-react';
import AlertBadge from './AlertBadge';
import { FlightOffer } from '@/lib/travelpayouts';

interface OfferCardProps {
  offer: FlightOffer;
}

const DESTINATION_IMAGES: Record<string, string> = {
  EZE: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=600&auto=format&fit=crop", // Buenos Aires
  SCL: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop", // Santiago
  MIA: "https://images.unsplash.com/photo-1506422748879-887454f9dbf4?q=80&w=600&auto=format&fit=crop", // Miami
  MCO: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?q=80&w=600&auto=format&fit=crop", // Orlando
  LIS: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=600&auto=format&fit=crop", // Lisboa
  MAD: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600&auto=format&fit=crop", // Madrid
  CDG: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop", // Paris
  SDU: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop", // Rio
  SSA: "https://images.unsplash.com/photo-1582238479700-f9f381297e68?q=80&w=600&auto=format&fit=crop", // Salvador
  REC: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600&auto=format&fit=crop", // Recife
};

const COUNTRY_FLAGS: Record<string, string> = {
  AR: "🇦🇷",
  CL: "🇨🇱",
  US: "🇺🇸",
  PT: "🇵🇹",
  ES: "🇪🇸",
  FR: "🇫🇷",
  BR: "🇧🇷",
};

export default function OfferCard({ offer }: OfferCardProps) {
  const imageUrl = DESTINATION_IMAGES[offer.destination] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop";
  const flag = COUNTRY_FLAGS[offer.countryCode] || "✈️";

  // Label checking
  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
  const isTariffError = offer.price < 500 && offer.destination !== "SDU"; // Mock error tariff indicator

  return (
    <div className="card flex flex-col h-full group">
      {/* Image and badges */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={offer.destinationName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isTariffError ? (
            <AlertBadge text="Erro Tarifário!" />
          ) : (
            <AlertBadge text={`${discount}% de Desconto`} />
          )}
        </div>

        {/* Country Badge */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#0A1628] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <span>{flag}</span>
          <span>{offer.countryName}</span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4 bg-[#0A1628]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          {offer.type === 'voo' ? '✈️ Voo' : offer.type === 'hotel' ? '🏨 Hotel' : '📦 Pacote'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1 text-xs text-[#8896A9] font-medium mb-1 uppercase tracking-wider">
            <PlaneTakeoff size={12} className="text-[#5BA4CF]" />
            <span>Saindo de {offer.originName} ({offer.origin})</span>
          </div>
          <h3 className="text-lg font-bold text-[#0A1628] leading-tight">
            {offer.destinationName} ({offer.destination})
          </h3>
        </div>

        {/* Dates */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8896A9]">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            Ida: {new Date(offer.departureDate).toLocaleDateString('pt-BR')}
          </span>
          {offer.returnDate && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Volta: {new Date(offer.returnDate).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-4 border-t border-[#5BA4CF]/10 flex items-end justify-between">
          <div>
            <span className="block text-xs text-[#8896A9] line-through">
              R$ {offer.originalPrice.toLocaleString('pt-BR')}
            </span>
            <span className="text-xl font-extrabold text-[#0A1628] flex items-center gap-1">
              <span className="text-xs text-[#8896A9] font-normal">R$</span>
              <span className="text-[#2D7DB8]">{offer.price.toLocaleString('pt-BR')}</span>
            </span>
          </div>

          <a
            href={offer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button px-4 py-2.5 text-xs bg-[#FFD43B] hover:bg-[#F0B429] text-[#0A1628] flex items-center gap-1.5 shadow-sm font-semibold rounded-full"
          >
            <span>Ver oferta</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
