// src/data/mk-logistics.ts

export const TRANSPORT_RATES = {
    costs: {
      parking_standard: 30,
      parking_preferred: 55,
      uber_base: 10,
      uber_mile: 1.6,
      minnie_van_base: 28,
      minnie_van_mile: 2.7
    },
    speeds: {
      bus_mph: 32,
      car_mph: 38,
      walking_mph: 3
    },
    friction: {
      ttc_transfer: 25,
      bus_wait: 18,
      security_check: 8
    }
  };
  
  // ZONAS CON COORDENADAS PARA EL MAPA TÁCTICO (0-100%)
  // MK está fijo en: top: 20%, left: 50%
  export const ORIGIN_ZONES_DETAILED = [
    {
      label: "Resorts Área Magic Kingdom",
      icon: "solar:crown-bold-duotone",
      options: [
        { id: 'mk_monorail', label: "Grand Floridian / Contemporary / Poly", distance: 1.5, type: 'disney', hasDirectAccess: true, mode: 'monorail', mapPos: { top: 25, left: 40 } },
        { id: 'mk_boat', label: "Wilderness Lodge / Fort Wilderness", distance: 2, type: 'disney', hasDirectAccess: true, mode: 'boat', mapPos: { top: 25, left: 60 } }
      ]
    },
    {
      label: "Resorts Área Epcot / Hollywood",
      icon: "solar:stars-bold-duotone",
      options: [
        { id: 'epcot_deluxe', label: "Boardwalk / Yacht & Beach", distance: 6, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 50, left: 50 } },
        { id: 'skyliner_hub', label: "Riviera / Caribbean Beach", distance: 6.5, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 55, left: 55 } },
        { id: 'skyliner_value', label: "Pop Century / Art of Animation", distance: 7, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 60, left: 52 } }
      ]
    },
    {
      label: "Resorts Área Animal Kingdom / Springs",
      icon: "solar:leaf-bold-duotone",
      options: [
        { id: 'ak_lodge', label: "Animal Kingdom Lodge", distance: 10, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 50, left: 20 } },
        { id: 'springs_resort', label: "Saratoga / Old Key West / Port Orleans", distance: 8, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 40, left: 75 } },
        { id: 'all_stars', label: "All-Star Movies / Music / Sports", distance: 9, type: 'disney', hasDirectAccess: true, mode: 'bus', mapPos: { top: 65, left: 25 } }
      ]
    },
    {
      label: "Visitantes Externos (Off-Property)",
      icon: "solar:earth-bold-duotone",
      options: [
        { id: 'off_universal', label: "Área Universal / I-Drive", distance: 14, type: 'off', hasDirectAccess: false, mode: 'car', mapPos: { top: 10, left: 80 } },
        { id: 'off_kissimmee', label: "Área Kissimmee / Champions Gate", distance: 18, type: 'off', hasDirectAccess: false, mode: 'car', mapPos: { top: 85, left: 40 } },
        { id: 'off_lbv', label: "Hoteles Lake Buena Vista", distance: 6, type: 'off', hasDirectAccess: false, mode: 'car', mapPos: { top: 45, left: 85 } }
      ]
    }
  ];