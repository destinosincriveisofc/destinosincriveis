"use client";

import React, { useEffect, useRef, useState } from 'react';

const AIRPORTS: Record<string, { lat: number; lng: number }> = {
  GRU: { lat: -23.5505, lng: -46.6333 },
  GIG: { lat: -22.8089, lng: -43.2436 },
  MIA: { lat: 25.7933, lng: -80.2906 },
  LIS: { lat: 38.7742, lng: -9.1342 },
  EZE: { lat: -34.8127, lng: -58.5358 },
  DXB: { lat: 25.2532, lng: 55.3657 },
  CDG: { lat: 49.0097, lng: 2.5479 },
  MAD: { lat: 40.4168, lng: -3.7038 },
  MCO: { lat: 28.5383, lng: -81.3792 },
  SCL: { lat: -33.4489, lng: -70.6693 },
  SDU: { lat: -22.9105, lng: -43.1631 },
  BSB: { lat: -15.7975, lng: -47.8919 },
  SSA: { lat: -12.9714, lng: -38.5014 },
  REC: { lat: -8.0578, lng: -34.8829 },
  VCP: { lat: -23.0078, lng: -47.1345 },
};

interface TravelGlobeProps {
  offers?: Array<{
    destination: string;
    origin?: string;
    price?: number;
  }>;
  height?: number;
  width?: number;
}

export default function TravelGlobe({ offers = [], height = 400, width = 500 }: TravelGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const [Globe, setGlobe] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    import('react-globe.gl').then((mod) => {
      if (!cancelled) setGlobe(() => mod.default);
    });

    return () => { cancelled = true; };
  }, [mounted]);

  const arcsData = [
    { startLat: AIRPORTS.GRU.lat, startLng: AIRPORTS.GRU.lng, endLat: AIRPORTS.MIA.lat, endLng: AIRPORTS.MIA.lng, color: ['#38BDF8', '#FFC107'] },
    { startLat: AIRPORTS.GRU.lat, startLng: AIRPORTS.GRU.lng, endLat: AIRPORTS.LIS.lat, endLng: AIRPORTS.LIS.lng, color: ['#38BDF8', '#FFC107'] },
    { startLat: AIRPORTS.GRU.lat, startLng: AIRPORTS.GRU.lng, endLat: AIRPORTS.EZE.lat, endLng: AIRPORTS.EZE.lng, color: ['#38BDF8', '#FFC107'] },
    { startLat: AIRPORTS.GRU.lat, startLng: AIRPORTS.GRU.lng, endLat: AIRPORTS.DXB.lat, endLng: AIRPORTS.DXB.lng, color: ['#38BDF8', '#FFC107'] },
    { startLat: AIRPORTS.GIG.lat, startLng: AIRPORTS.GIG.lng, endLat: AIRPORTS.MIA.lat, endLng: AIRPORTS.MIA.lng, color: ['#FFC107', '#38BDF8'] },
    { startLat: AIRPORTS.GIG.lat, startLng: AIRPORTS.GIG.lng, endLat: AIRPORTS.LIS.lat, endLng: AIRPORTS.LIS.lng, color: ['#FFC107', '#38BDF8'] },
    { startLat: AIRPORTS.GIG.lat, startLng: AIRPORTS.GIG.lng, endLat: AIRPORTS.EZE.lat, endLng: AIRPORTS.EZE.lng, color: ['#FFC107', '#38BDF8'] },
    { startLat: AIRPORTS.GIG.lat, startLng: AIRPORTS.GIG.lng, endLat: AIRPORTS.DXB.lat, endLng: AIRPORTS.DXB.lng, color: ['#FFC107', '#38BDF8'] },
  ];

  const pointsData = [
    { lat: AIRPORTS.GRU.lat, lng: AIRPORTS.GRU.lng, label: 'GRU', color: '#38BDF8' },
    { lat: AIRPORTS.GIG.lat, lng: AIRPORTS.GIG.lng, label: 'GIG', color: '#38BDF8' },
    { lat: AIRPORTS.MIA.lat, lng: AIRPORTS.MIA.lng, label: 'MIA', color: '#FFC107' },
    { lat: AIRPORTS.LIS.lat, lng: AIRPORTS.LIS.lng, label: 'LIS', color: '#FFC107' },
    { lat: AIRPORTS.EZE.lat, lng: AIRPORTS.EZE.lng, label: 'EZE', color: '#FFC107' },
    { lat: AIRPORTS.DXB.lat, lng: AIRPORTS.DXB.lng, label: 'DXB', color: '#FFC107' },
  ];

  const offerPointsData = offers
    .filter((o) => o.destination && AIRPORTS[o.destination.toUpperCase()])
    .map((o) => {
      const ap = AIRPORTS[o.destination.toUpperCase()];
      return {
        lat: ap.lat,
        lng: ap.lng,
        label: `${o.destination.toUpperCase()}${o.price ? ` - R$ ${o.price}` : ''}`,
        color: '#FFC107',
        radius: 0.6,
      };
    });

  if (!mounted || !Globe) {
    return (
      <div
        ref={containerRef}
        style={{
          width,
          height,
          borderRadius: 16,
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.03) 0%, transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38BDF8',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}
      >
        Inicializando Globo 3D...
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width, height, position: 'relative' }}>
      <Globe
        width={width}
        height={height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        showGraticules={true}
        graticulesColor="rgba(56,189,248,0.08)"
        showAtmosphere={true}
        atmosphereColor="#38BDF8"
        atmosphereAltitude={0.15}
        globeCurvatureResolution={30}

        arcsData={arcsData}
        arcStartLat={(d: any) => d.startLat}
        arcStartLng={(d: any) => d.startLng}
        arcEndLat={(d: any) => d.endLat}
        arcEndLng={(d: any) => d.endLng}
        arcColor={(d: any) => d.color}
        arcAltitude={0.5}
        arcAltitudeAutoScale={0.8}
        arcStroke={1.2}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
        arcsTransitionDuration={0}

        pointsData={[...pointsData, ...offerPointsData]}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.03}
        pointRadius="radius"
        pointResolution={16}
        pointsMerge={true}
        pointLabel="label"

        ringsData={offerPointsData.length > 0 ? offerPointsData : pointsData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => ['rgba(56,189,248,0.4)', 'rgba(255,193,7,0.4)']}
        ringMaxRadius={2.5}
        ringPropagationSpeed={3}
        ringRepeatPeriod={1200}

        enablePointerInteraction={false}
      />
    </div>
  );
}
