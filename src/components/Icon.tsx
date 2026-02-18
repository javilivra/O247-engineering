"use client";

// ============================================================
// O247 ICON SYSTEM — Centralized Icon Component
// ============================================================
// Reemplaza @iconify/react con lucide-react (zero network, tree-shakeable)
// Usage: <O247Icon name="solar:star-bold-duotone" size={20} className="text-sunset" />
//    OR: <O247Icon name="star" size={20} />  (nombre corto Lucide)
// ============================================================

import React from "react";
import {
  Star, StarOff, Sparkles, Flame, Zap, Crown, Trophy,
  Heart, HeartPulse, Baby, Moon, Sun, CloudRain, CloudLightning, Cloud, Snowflake,
  Clock, Timer, Hourglass, Calendar, CalendarCheck,
  MapPin, Map, Compass, Navigation, Route,
  Search, X, XCircle, Check, CheckCircle, CheckCheck, CircleAlert, TriangleAlert, Info, ShieldCheck, Lock,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, ArrowUpRight, ExternalLink,
  Play, Camera, Video, Headphones, Volume2,
  Users, User, UserCheck, UserPlus,
  Ticket, Wallet, ShoppingBag, ShoppingCart, Tag,
  UtensilsCrossed, CookingPot, Coffee, IceCreamCone, Wine,
  Clapperboard, Drama, Ghost, Wand2, PartyPopper, Gem, Gamepad2,
  Smartphone, Cpu, Layers, LayoutGrid, Settings, SlidersHorizontal, ListFilter, ArrowDownUp,
  FileText, BookMarked, Clipboard, ClipboardCheck, MessageCircle, MessageSquare,
  Home, Building2, Castle, TreePine, Palmtree, Waves, Ship, Bus, Train, Bike, Accessibility,
  CircleDot, AlertCircle, RotateCcw, RefreshCw, PlusCircle, Lightbulb,
  Ruler, Droplets, Wind, Aperture, Eye, EyeOff, Maximize2, Minimize2, Move,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// ICON MAP — solar/ph/mdi/tabler → Lucide
// ============================================================
// This maps ALL Iconify icon names used across O247 to Lucide equivalents.
// If an icon has no perfect match, we pick the closest semantic equivalent.

const ICON_MAP: Record<string, LucideIcon> = {
  // ---- Stars / Ratings ----
  "solar:star-bold": Star,
  "solar:star-bold-duotone": Star,
  "solar:star-fall-bold-duotone": Sparkles,
  "solar:stars-minimalistic-bold": Sparkles,
  "solar:stars-minimalistic-bold-duotone": Sparkles,
  "solar:crown-bold": Crown,
  "solar:crown-bold-duotone": Crown,
  "solar:crown-star-bold": Crown,
  "solar:crown-star-bold-duotone": Crown,
  "solar:cup-star-bold-duotone": Trophy,
  "solar:cup-bold": Coffee,
  "solar:cup-bold-duotone": Coffee,
  "solar:cup-hot-bold-duotone": Coffee,
  "solar:tea-cup-bold": Coffee,
  "solar:tea-cup-bold-duotone": Coffee,
  "solar:gem-bold": Gem,
  "solar:gem-bold-duotone": Gem,

  // ---- Action / Energy ----
  "solar:bolt-bold": Zap,
  "solar:bolt-bold-duotone": Zap,
  "solar:fire-bold-duotone": Flame,
  "solar:flash-bold": Zap,
  "solar:lightbulb-bold": Lightbulb,
  "solar:lightbulb-bolt-bold-duotone": Lightbulb,
  "solar:play-bold": Play,
  "solar:play-bold-duotone": Play,
  "solar:magic-stick-3-bold": Wand2,
  "solar:hand-stars-bold-duotone": Sparkles,
  "solar:confetti-bold": PartyPopper,
  "solar:confetti-bold-duotone": PartyPopper,
  "solar:balloon-bold": PartyPopper,
  "solar:balloon-bold-duotone": PartyPopper,

  // ---- Navigation / Arrows ----
  "solar:arrow-right-linear": ArrowRight,
  "solar:arrow-right-bold": ArrowRight,
  "solar:arrow-left-linear": ArrowLeft,
  "solar:arrow-right-up-linear": ArrowUpRight,
  "solar:arrow-up-bold": ArrowUp,
  "solar:arrow-down-bold": ArrowDown,
  "solar:alt-arrow-down-linear": ChevronDown,
  "solar:alt-arrow-up-linear": ChevronUp,
  "solar:alt-arrow-left-linear": ChevronLeft,
  "solar:alt-arrow-right-linear": ChevronRight,
  "solar:link-bold-duotone": ExternalLink,

  // ---- Close / Check / Status ----
  "solar:close-circle-bold": XCircle,
  "solar:close-circle-linear": XCircle,
  "solar:check-circle-bold": CheckCircle,
  "solar:check-circle-bold-duotone": CheckCircle,
  "solar:check-read-bold": CheckCheck,
  "solar:verified-check-bold": CheckCircle,
  "solar:danger-triangle-bold": TriangleAlert,
  "solar:danger-triangle-bold-duotone": TriangleAlert,
  "solar:danger-circle-bold-duotone": AlertCircle,
  "solar:info-circle-bold": Info,
  "solar:question-circle-bold": CircleAlert,
  "solar:question-circle-bold-duotone": CircleAlert,
  "solar:shield-check-bold": ShieldCheck,
  "solar:shield-check-bold-duotone": ShieldCheck,
  "solar:shield-check-outline": ShieldCheck,
  "solar:lock-keyhole-bold-duotone": Lock,
  "solar:safe-square-bold-duotone": ShieldCheck,

  // ---- Time ----
  "solar:clock-circle-bold": Clock,
  "solar:clock-circle-bold-duotone": Clock,
  "solar:clock-circle-outline": Clock,
  "solar:hourglass-bold-duotone": Hourglass,
  "solar:stopwatch-bold-duotone": Timer,
  "solar:alarm-play-bold-duotone": Timer,
  "solar:calendar-bold-duotone": Calendar,
  "solar:calendar-mark-bold-duotone": CalendarCheck,

  // ---- Map / Location ----
  "solar:map-bold-duotone": Map,
  "solar:map-point-bold": MapPin,
  "solar:map-point-bold-duotone": MapPin,
  "solar:map-point-wave-outline": MapPin,
  "solar:compass-bold-duotone": Compass,
  "solar:compass-big-bold-duotone": Compass,
  "solar:routing-3-bold-duotone": Route,
  "solar:route-bold": Route,

  // ---- Weather ----
  "solar:sun-bold-duotone": Sun,
  "solar:sun-2-bold-duotone": Sun,
  "solar:moon-bold": Moon,
  "solar:moon-bold-duotone": Moon,
  "solar:cloud-rain-bold-duotone": CloudRain,
  "solar:cloud-storm-bold-duotone": CloudLightning,
  "solar:clouds-bold-duotone": Cloud,
  "solar:snowflake-bold": Snowflake,
  "solar:snowflake-bold-duotone": Snowflake,
  "solar:tornado-bold": Wind,
  "solar:drop-bold": Droplets,
  "solar:drop-bold-duotone": Droplets,

  // ---- People ----
  "solar:user-bold-duotone": User,
  "solar:user-speak-bold-duotone": UserCheck,
  "solar:user-hand-up-bold": UserPlus,
  "solar:user-hand-up-bold-duotone": UserPlus,
  "solar:users-group-rounded-bold-duotone": Users,
  "solar:users-group-two-rounded-bold": Users,
  "solar:users-group-two-rounded-bold-duotone": Users,
  "solar:people-nearby-bold-duotone": Users,
  "solar:heart-bold": Heart,
  "solar:heart-bold-duotone": Heart,
  "solar:heart-pulse-bold-duotone": HeartPulse,
  "solar:sleeping-square-bold-duotone": Moon,
  "solar:confounded-square-bold-duotone": AlertCircle,

  // ---- Search / Filter / Sort ----
  "solar:magnifer-linear": Search,
  "solar:magnifer-bold-duotone": Search,
  "solar:tuning-2-bold": SlidersHorizontal,
  "solar:settings-linear": Settings,
  "solar:settings-bold-duotone": Settings,
  "solar:sort-vertical-linear": ArrowDownUp,
  "solar:sort-vertical-bold-duotone": ArrowDownUp,
  "solar:sort-from-top-to-bottom-bold-duotone": ListFilter,
  "solar:list-cross-bold-duotone": ListFilter,
  "solar:restart-bold": RotateCcw,
  "solar:refresh-bold": RefreshCw,
  "solar:refresh-circle-bold-duotone": RefreshCw,
  "solar:add-circle-linear": PlusCircle,

  // ---- Dining ----
  "ph:fork-knife-bold": UtensilsCrossed,
  "solar:chef-hat-bold": CookingPot,
  "solar:chef-hat-bold-duotone": CookingPot,
  "solar:chef-hat-outline": CookingPot,
  "solar:cookie-bold": IceCreamCone,
  "solar:cookie-bold-duotone": IceCreamCone,

  // ---- Entertainment / Shows ----
  "mdi:magic": Wand2,
  "solar:clapperboard-play-bold-duotone": Clapperboard,
  "solar:mask-happly-bold-duotone": Drama,
  "solar:masks-bold": Drama,
  "solar:masks-bold-duotone": Drama,
  "solar:ghost-bold-duotone": Ghost,
  "solar:ghost-smile-bold-duotone": Ghost,
  "solar:gamepad-bold-duotone": Gamepad2,
  "solar:videocamera-record-bold-duotone": Video,
  "solar:headphones-round-bold-duotone": Headphones,
  "solar:volume-loud-bold": Volume2,

  // ---- Shopping / Commerce ----
  "solar:bag-bold-duotone": ShoppingBag,
  "solar:bag-4-bold-duotone": ShoppingBag,
  "solar:bag-cross-bold-duotone": ShoppingCart,
  "solar:wallet-bold-duotone": Wallet,
  "solar:ticket-bold": Ticket,
  "solar:ticket-bold-duotone": Ticket,
  "solar:ticket-sale-bold": Tag,
  "solar:ticket-sale-bold-duotone": Tag,

  // ---- Documents / Content ----
  "solar:document-bold-duotone": FileText,
  "solar:book-bookmark-bold-duotone": BookMarked,
  "solar:clipboard-check-bold-duotone": ClipboardCheck,
  "solar:checklist-bold-duotone": Clipboard,
  "solar:chat-round-bold-duotone": MessageCircle,
  "solar:chat-round-unread-bold-duotone": MessageSquare,

  // ---- Camera / Photo ----
  "solar:camera-bold-duotone": Camera,
  "solar:camera-add-bold": Camera,
  "solar:gallery-wide-bold-duotone": Maximize2,

  // ---- Tech / System ----
  "solar:smartphone-bold": Smartphone,
  "solar:smartphone-2-bold": Smartphone,
  "solar:smartphone-2-bold-duotone": Smartphone,
  "solar:cpu-bolt-bold-duotone": Cpu,
  "solar:layers-minimalistic-bold-duotone": Layers,
  "solar:widget-2-bold-duotone": LayoutGrid,
  "solar:text-square-bold-duotone": FileText,
  "solar:graph-up-bold-duotone": ArrowUpRight,
  "solar:chart-2-bold-duotone": ArrowUpRight,

  // ---- Transport / Places ----
  "solar:home-bold-duotone": Home,
  "solar:castle-bold": Castle,
  "solar:planet-bold": Sparkles,
  "solar:planet-bold-duotone": Sparkles,
  "solar:bus-bold": Bus,
  "solar:train-bold": Train,
  "solar:sailing-bold": Ship,
  "solar:city-bold": Building2,
  "solar:bed-bold": Home,
  "solar:walking-round-bold": Move,
  "solar:transfer-horizontal-bold": ArrowRight,
  "solar:bone-bold": Baby,

  // ---- Accessibility / Physical ----
  "solar:wheelchair-bold-duotone": Accessibility,
  "solar:ruler-bold-duotone": Ruler,
  "solar:wheel-bold": RotateCcw,
  "solar:hamburger-menu-bold": SlidersHorizontal,
  "solar:hamburger-menu-bold-duotone": SlidersHorizontal,
  "solar:box-minimalistic-bold": Maximize2,
  "solar:hammer-bold": Wand2,

  // ---- Characters (custom placeholder) ----
  "tabler:mickey": Star, // Will use custom SVG below
};

// ============================================================
// CUSTOM SVG ICONS (no Lucide equivalent)
// ============================================================

function MickeyIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="14" r="7" />
      <circle cx="6" cy="6" r="4" />
      <circle cx="18" cy="6" r="4" />
    </svg>
  );
}

// ============================================================
// DROP-IN COMPONENT
// ============================================================
// Compatible with existing Iconify API:
//   <Icon icon="solar:star-bold-duotone" width={20} className="text-sunset" />
// Becomes:
//   <O247Icon name="solar:star-bold-duotone" size={20} className="text-sunset" />

interface O247IconProps {
  /** Iconify-style name (e.g. "solar:star-bold-duotone") or Lucide name */
  name: string;
  /** Size in pixels (default 24) */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Width override (for compat with Iconify's width prop) */
  width?: number;
}

export default function O247Icon({ name, size, className = "", width }: O247IconProps) {
  const resolvedSize = width ?? size ?? 24;

  // Custom SVGs
  if (name === "tabler:mickey") {
    return <MickeyIcon size={resolvedSize} className={className} />;
  }

  // Lookup in map
  const LucideComponent = ICON_MAP[name];
  
  if (LucideComponent) {
    return <LucideComponent size={resolvedSize} className={className} />;
  }

  // Fallback: try to match partial name for dynamic icon strings
  // e.g. if someone passes just "star" or "heart"
  const fallbackMap: Record<string, LucideIcon> = {
    star: Star, heart: Heart, check: CheckCircle, close: XCircle,
    search: Search, settings: Settings, map: Map, clock: Clock,
    user: User, users: Users, play: Play, info: Info,
  };

  const simpleKey = name.split(":").pop()?.split("-")[0] ?? "";
  const FallbackComponent = fallbackMap[simpleKey];
  
  if (FallbackComponent) {
    return <FallbackComponent size={resolvedSize} className={className} />;
  }

  // Last resort: render a dot (visible debug indicator)
  if (process.env.NODE_ENV === "development") {
    return (
      <span 
        className={`inline-flex items-center justify-center rounded bg-red-100 text-red-500 text-[8px] font-mono ${className}`}
        style={{ width: resolvedSize, height: resolvedSize }}
        title={`Missing icon: ${name}`}
      >
        ?
      </span>
    );
  }

  return <CircleDot size={resolvedSize} className={className} />;
}

// ============================================================
// ADAPTER — Makes O247Icon work as drop-in for <Icon icon="..." />
// ============================================================
// In components, replace:
//   import { Icon } from "@/components/Icon";
// With:
//   import { Icon } from "@/components/Icon";

export function Icon({ icon, width, className }: { icon: string; width?: number; className?: string }) {
  return <O247Icon name={icon} width={width} className={className} />;
}