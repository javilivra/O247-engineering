"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// --- DATA: INVENTARIO COMPLETO 2026 ---
const ATTRACTIONS = [
  // --- TOMORROWLAND ---
  {
    id: 'tron',
    name: 'TRON Lightcycle / Run',
    land: 'Tomorrowland',
    tier: 'Tier 1',
    type: 'Thrill / Launch',
    access: 'ILL / VQ',
    wait: 'Sold Out',
    status: 'open',
    img: '/images/tron_mk.jpg',
    link: '/disney/mk/attractions/tron'
  },
  {
    id: 'space',
    name: 'Space Mountain',
    land: 'Tomorrowland',
    tier: 'Tier 1',
    type: 'Coaster',
    access: 'Multi Pass',
    wait: '45m',
    status: 'open',
    img: '/images/space_mountain.jpg',
    link: '#'
  },
  {
    id: 'buzz',
    name: 'Buzz Lightyear’s Space Ranger Spin',
    land: 'Tomorrowland',
    tier: 'Tier 2',
    type: 'Interactive',
    access: 'Multi Pass',
    wait: '35m',
    status: 'open',
    img: '/images/buzz.jpg',
    link: '#'
  },
  {
    id: 'peoplemover',
    name: 'TTA PeopleMover',
    land: 'Tomorrowland',
    tier: 'Tier 3',
    type: 'Slow Ride',
    access: 'Standby',
    wait: '15m',
    status: 'open',
    img: '/images/peoplemover.jpg',
    link: '#'
  },
  {
    id: 'astro',
    name: 'Astro Orbiter',
    land: 'Tomorrowland',
    tier: 'Tier 3',
    type: 'Spinner',
    access: 'Standby',
    wait: '40m',
    status: 'open',
    img: '/images/astro.jpg',
    link: '#'
  },
  {
    id: 'monsters',
    name: 'Monsters, Inc. Laugh Floor',
    land: 'Tomorrowland',
    tier: 'Tier 2',
    type: 'Show',
    access: 'Multi Pass',
    wait: '20m',
    status: 'open',
    img: '/images/monsters.jpg',
    link: '#'
  },
  {
    id: 'cop',
    name: 'Carousel of Progress',
    land: 'Tomorrowland',
    tier: 'Tier 3',
    type: 'Show / Classic',
    access: 'Standby',
    wait: '5m',
    status: 'open',
    img: '/images/cop.jpg',
    link: '#'
  },
  {
    id: 'speedway',
    name: 'Tomorrowland Speedway',
    land: 'Tomorrowland',
    tier: 'Tier 3',
    type: 'Drive',
    access: 'Multi Pass',
    wait: '25m',
    status: 'open',
    img: '/images/speedway.jpg',
    link: '#'
  },

  // --- FANTASYLAND ---
  {
    id: '7dmt',
    name: 'Seven Dwarfs Mine Train',
    land: 'Fantasyland',
    tier: 'Tier 1',
    type: 'Family Coaster',
    access: 'ILL',
    wait: '85m',
    status: 'open',
    img: '/images/7dmt.jpg',
    link: '/disney/mk/attractions/seven-dwarfs'
  },
  {
    id: 'peter',
    name: 'Peter Pan’s Flight',
    land: 'Fantasyland',
    tier: 'Tier 1',
    type: 'Dark Ride',
    access: 'Multi Pass',
    wait: '65m',
    status: 'open',
    img: '/images/peter_pan.jpg',
    link: '#'
  },
  {
    id: 'pooh',
    name: 'Many Adventures of Winnie the Pooh',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Dark Ride',
    access: 'Multi Pass',
    wait: '40m',
    status: 'open',
    img: '/images/pooh.jpg',
    link: '#'
  },
  {
    id: 'smallworld',
    name: '“it’s a small world”',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Boat Ride',
    access: 'Multi Pass',
    wait: '25m',
    status: 'open',
    img: '/images/small_world.jpg',
    link: '#'
  },
  {
    id: 'mermaid',
    name: 'Under the Sea ~ Little Mermaid',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Dark Ride',
    access: 'Multi Pass',
    wait: '30m',
    status: 'open',
    img: '/images/mermaid.jpg',
    link: '#'
  },
  {
    id: 'belle',
    name: 'Enchanted Tales with Belle',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Interactive',
    access: 'Multi Pass',
    wait: '20m',
    status: 'open',
    img: '/images/belle.jpg',
    link: '#'
  },
  {
    id: 'barnstormer',
    name: 'The Barnstormer',
    land: 'Fantasyland',
    tier: 'Tier 3',
    type: 'Junior Coaster',
    access: 'Multi Pass',
    wait: '25m',
    status: 'open',
    img: '/images/barnstormer.jpg',
    link: '#'
  },
  {
    id: 'dumbo',
    name: 'Dumbo the Flying Elephant',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Classic',
    access: 'Multi Pass',
    wait: '35m',
    status: 'open',
    img: '/images/dumbo.jpg',
    link: '#'
  },
  {
    id: 'teaparty',
    name: 'Mad Tea Party',
    land: 'Fantasyland',
    tier: 'Tier 3',
    type: 'Spinner',
    access: 'Multi Pass',
    wait: '15m',
    status: 'open',
    img: '/images/teaparty.jpg',
    link: '#'
  },
  {
    id: 'philhar',
    name: 'Mickey’s PhilharMagic',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: '3D Show',
    access: 'Multi Pass',
    wait: '15m',
    status: 'open',
    img: '/images/philhar.jpg',
    link: '#'
  },
  {
    id: 'carrousel',
    name: 'Prince Charming Carrousel',
    land: 'Fantasyland',
    tier: 'Tier 3',
    type: 'Classic',
    access: 'Standby',
    wait: '20m',
    status: 'open',
    img: '/images/carrousel.jpg',
    link: '#'
  },
  {
    id: 'princess',
    name: 'Princess Fairytale Hall',
    land: 'Fantasyland',
    tier: 'Tier 2',
    type: 'Meet & Greet',
    access: 'Multi Pass',
    wait: '45m',
    status: 'open',
    img: '/images/princess.jpg',
    link: '#'
  },

  // --- FRONTIERLAND & LIBERTY SQUARE ---
  {
    id: 'tiana',
    name: 'Tiana’s Bayou Adventure',
    land: 'Frontierland',
    tier: 'Tier 1',
    type: 'Water Ride',
    access: 'MP / VQ',
    wait: 'VQ Full',
    status: 'open',
    img: '/images/tiana.jpg',
    link: '/disney/mk/attractions/tiana'
  },
  {
    id: 'btmr',
    name: 'Big Thunder Mountain',
    land: 'Frontierland',
    tier: 'Tier 1',
    type: 'Coaster',
    access: 'CLOSED',
    wait: '-',
    status: 'closed', // ESTADO CRITICO
    img: '/images/btmr.jpg',
    link: '#'
  },
  {
    id: 'hm',
    name: 'Haunted Mansion',
    land: 'Liberty Square',
    tier: 'Tier 1',
    type: 'Dark Ride',
    access: 'Multi Pass',
    wait: '50m',
    status: 'open',
    img: '/images/haunted_mansion.jpg',
    link: '#'
  },
  {
    id: 'bears',
    name: 'Country Bear Musical Jamboree',
    land: 'Frontierland',
    tier: 'Tier 3',
    type: 'Show',
    access: 'Standby',
    wait: '10m',
    status: 'open',
    img: '/images/bears.jpg',
    link: '#'
  },
  {
    id: 'sawyer',
    name: 'Tom Sawyer Island',
    land: 'Frontierland',
    tier: 'Tier 3',
    type: 'Exploration',
    access: 'Raft',
    wait: 'N/A',
    status: 'open',
    img: '/images/sawyer.jpg',
    link: '#'
  },
  {
    id: 'riverboat',
    name: 'Liberty Square Riverboat',
    land: 'Liberty Square',
    tier: 'Tier 3',
    type: 'Boat',
    access: 'Standby',
    wait: '20m',
    status: 'open',
    img: '/images/riverboat.jpg',
    link: '#'
  },
  {
    id: 'presidents',
    name: 'The Hall of Presidents',
    land: 'Liberty Square',
    tier: 'Tier 3',
    type: 'Show',
    access: 'Standby',
    wait: '0m',
    status: 'open',
    img: '/images/presidents.jpg',
    link: '#'
  },

  // --- ADVENTURELAND ---
  {
    id: 'jungle',
    name: 'Jungle Cruise',
    land: 'Adventureland',
    tier: 'Tier 1',
    type: 'Boat Ride',
    access: 'Multi Pass',
    wait: '70m',
    status: 'open',
    img: '/images/jungle.jpg',
    link: '#'
  },
  {
    id: 'pirates',
    name: 'Pirates of the Caribbean',
    land: 'Adventureland',
    tier: 'Tier 1',
    type: 'Boat Ride',
    access: 'Multi Pass',
    wait: '45m',
    status: 'open',
    img: '/images/pirates.jpg',
    link: '#'
  },
  {
    id: 'carpets',
    name: 'Magic Carpets of Aladdin',
    land: 'Adventureland',
    tier: 'Tier 2',
    type: 'Spinner',
    access: 'Multi Pass',
    wait: '25m',
    status: 'open',
    img: '/images/carpets.jpg',
    link: '#'
  },
  {
    id: 'tiki',
    name: 'Enchanted Tiki Room',
    land: 'Adventureland',
    tier: 'Tier 3',
    type: 'Show',
    access: 'Standby',
    wait: '10m',
    status: 'open',
    img: '/images/tiki.jpg',
    link: '#'
  },
  {
    id: 'swiss',
    name: 'Swiss Family Treehouse',
    land: 'Adventureland',
    tier: 'Tier 3',
    type: 'Walk-through',
    access: 'Standby',
    wait: '0m',
    status: 'open',
    img: '/images/swiss.jpg',
    link: '#'
  },

  // --- MAIN STREET ---
  {
    id: 'mickey',
    name: 'Town Square Theater',
    land: 'Main Street',
    tier: 'Tier 2',
    type: 'Meet Mickey',
    access: 'Multi Pass',
    wait: '40m',
    status: 'open',
    img: '/images/mickey.jpg',
    link: '#'
  },
  {
    id: 'train',
    name: 'WDW Railroad',
    land: 'Main Street',
    tier: 'Tier 3',
    type: 'Transport',
    access: 'Standby',
    wait: '20m',
    status: 'open',
    img: '/images/train.jpg',
    link: '#'
  },
];

const FILTERS = ["Todos", "Tomorrowland", "Fantasyland", "Frontierland", "Liberty Square", "Adventureland", "Main Street"];

export default function AttractionsMatrixPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredAttractions = activeFilter === "Todos" 
    ? ATTRACTIONS 
    : ATTRACTIONS.filter(a => a.land === activeFilter);

  // Helper para color de Access Badge
  const getAccessBadgeColor = (access: string) => {
    if (access.includes('ILL') || access.includes('VQ')) return 'bg-celeste text-gunmetal border-celeste';
    if (access.includes('Multi Pass')) return 'bg-sunset text-white border-sunset';
    if (access === 'CLOSED') return 'bg-red-500 text-white border-red-500';
    return 'bg-white/20 text-white border-white/20'; // Standby
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-gunmetal font-sans pb-20">
      
      {/* 1. ALERTAS DE INGENIERÍA (Estado Crítico) */}
      <div className="bg-gunmetal text-white py-3 px-6 md:px-12 text-xs font-bold tracking-widest uppercase border-b-4 border-sunset relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex items-center gap-4 animate-pulse">
            <Icon icon="solar:danger-triangle-bold" className="text-sunset text-lg" />
            <span>ALERTAS DE INGENIERÍA 2026: Big Thunder Mountain (CERRADA) • Cinderella Castle (En Obras / Repintado)</span>
         </div>
      </div>

      {/* 2. HEADER & FILTROS */}
      {/* pt-4: Ajuste para el Breadcrumb Global relative */}
      <div className="pt-8 px-6 md:px-12 lg:px-24 mb-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-celeste mb-2">
                <Icon icon="solar:widget-5-bold" />
                <span className="text-xs font-bold tracking-widest uppercase font-mono">STATUS 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gunmetal tracking-tight">
                Matriz de <br/>Atracciones
              </h1>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all border ${
                    activeFilter === filter 
                    ? "bg-gunmetal text-white border-gunmetal shadow-lg" 
                    : "bg-white text-gunmetal/60 border-gunmetal/10 hover:border-gunmetal/30 hover:bg-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-gunmetal/10"></div>
        </div>
      </div>

      {/* 3. GRID DE ATRACCIONES */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {filteredAttractions.map((item) => (
            <Link 
              key={item.id} 
              href={item.status === 'open' ? item.link : '#'} 
              className={`group relative block h-[320px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${item.status === 'closed' ? 'grayscale cursor-not-allowed opacity-80' : ''}`}
            >
              
              {/* Imagen Fondo */}
              <div className="absolute inset-0 bg-gunmetal/10">
                <div className="w-full h-full bg-gunmetal relative">
                    {/* Placeholder visual o Imagen real */}
                    {/* <img src={item.img} alt={item.name} className="w-full h-full object-cover" /> */}
                    <div className={`w-full h-full bg-gradient-to-br opacity-80 transition-opacity ${item.status === 'closed' ? 'from-gray-800 to-black opacity-90' : 'from-gunmetal to-black group-hover:opacity-60'}`} />
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        {item.status === 'closed' 
                            ? <Icon icon="solar:lock-keyhole-bold" width={80} />
                            : <Icon icon="solar:star-circle-bold" width={100} />
                        }
                    </div>
                </div>
              </div>

              {/* Overlay Gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-gunmetal via-gunmetal/20 to-transparent" />

              {/* Contenido Card */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                
                {/* Badges Superiores */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-4">
                    <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-md text-[9px] font-bold text-white uppercase border border-white/20">
                        {item.land}
                    </span>
                    {/* Badge de Acceso (ILL, MP, VQ) */}
                    <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase border shadow-sm ${getAccessBadgeColor(item.access)}`}>
                        {item.access}
                    </span>
                </div>

                <div className="relative z-10">
                    <h3 className="text-xl font-black text-white leading-tight mb-3 group-hover:text-celeste transition-colors">
                        {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-3">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-white/60 uppercase tracking-widest font-mono">ESPERA</span>
                            <span className={`text-sm font-bold font-mono flex items-center gap-1 ${item.status === 'closed' ? 'text-red-400' : 'text-white'}`}>
                                {item.status === 'closed' ? <Icon icon="solar:forbidden-circle-bold"/> : <Icon icon="solar:clock-circle-bold" className="text-celeste"/>}
                                {item.wait}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] text-white/60 uppercase tracking-widest font-mono">TIPO</span>
                            <span className="text-xs font-medium text-white text-right">{item.type}</span>
                        </div>
                    </div>
                </div>

                {/* Hover Action */}
                {item.status === 'open' && (
                    <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                        <div className="w-8 h-8 rounded-full bg-white text-gunmetal flex items-center justify-center shadow-lg">
                            <Icon icon="solar:arrow-right-up-bold" width={16} />
                        </div>
                    </div>
                )}

              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
}