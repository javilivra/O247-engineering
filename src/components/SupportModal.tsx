"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ArrowRight, ChevronLeft, Copy, Check,
  BookOpen, Zap, Users, Globe, MapPin,
  Coffee, Sparkles, Rocket, Heart,
} from "lucide-react";
import { SiMercadopago, SiPaypal, SiStripe } from "@icons-pack/react-simple-icons";
import {
  SUPPORT_TIERS,
  SUPPORT_METHODS,
  BANK_DATA,
  PAYMENT_LINKS,
  SUPPORT_COPY,
  type SupportMethod,
} from "@/config/support-config";

type Step = 1 | 2 | 3;
interface Props { isOpen: boolean; onClose: () => void; }

function HeartSparkIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path d="M18 30S6 22 6 13.5a6 6 0 0 1 10.5-3.97L18 11l1.5-1.47A6 6 0 0 1 30 13.5C30 22 18 30 18 30z" fill="#FF7043" opacity="0.92"/>
      <line x1="27" y1="5" x2="27" y2="9" stroke="#FF7043" strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
      <line x1="25" y1="7" x2="29" y2="7" stroke="#FF7043" strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
      <line x1="31" y1="11" x2="31" y2="14" stroke="#00B4D8" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <line x1="29.5" y1="12.5" x2="32.5" y2="12.5" stroke="#00B4D8" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
      <circle cx="8" cy="8" r="1.2" fill="#FFD54F" opacity="0.6"/>
      <circle cx="28" cy="27" r="1" fill="#FF7043" opacity="0.4"/>
    </svg>
  );
}

function BankIcon({ size = 18, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"
        stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

const TIER_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  cafe:  Coffee,
  guia:  Sparkles,
  apoyo: Rocket,
};

function ProgressDots({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {([1, 2, 3] as Step[]).map((s) => (
        <motion.div
          key={s}
          animate={{
            width: s === step ? 24 : 6,
            backgroundColor: s <= step ? "#FF7043" : "rgba(37,52,63,0.12)",
          }}
          transition={{ duration: 0.3 }}
          style={{ height: 6, borderRadius: 99 }}
        />
      ))}
    </div>
  );
}

function StepIntro({ onNext }: { onNext: () => void }) {
  const values = [
    { icon: BookOpen, label: "Guías" },
    { icon: Zap,      label: "Herramientas" },
    { icon: Users,    label: "Comunidad" },
  ];
  return (
    <motion.div
      key="s1"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
        style={{ background: "rgba(255,112,67,0.07)", border: "1.5px solid rgba(255,112,67,0.18)" }}>
        <HeartSparkIcon />
        <span className="absolute -top-1.5 -right-1.5 text-yellow-400 text-sm">✦</span>
      </div>
      <h2 className="text-[22px] font-semibold mb-3 leading-tight" style={{ color: "#25343F", letterSpacing: "-0.025em" }}>
        {SUPPORT_COPY.intro.title}
      </h2>
      <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(37,52,63,0.58)", maxWidth: 272 }}>
        {SUPPORT_COPY.intro.body}
      </p>
      <div className="flex items-start gap-6 mb-8 w-full justify-center">
        {values.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,112,67,0.07)", border: "1.5px solid rgba(255,112,67,0.12)" }}>
              <Icon size={16} color="#FF7043" />
            </div>
            <span className="text-[10px] font-semibold tracking-wide" style={{ color: "rgba(37,52,63,0.38)" }}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
        style={{ background: "#FF7043", color: "white" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#E64A19")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#FF7043")}
      >
        {SUPPORT_COPY.intro.cta} <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}

function StepMethod({ onSelect, onBack }: { onSelect: (m: SupportMethod) => void; onBack: () => void }) {
  const arg  = SUPPORT_METHODS.filter((m) => m.region === "argentina");
  const intl = SUPPORT_METHODS.filter((m) => m.region === "international");

  function MethodBtn({ method }: { method: SupportMethod }) {
    const [hov, setHov] = useState(false);
    const iconColor = hov && method.available ? "#FF7043" : "rgba(37,52,63,0.45)";
    function renderLogo() {
      if (method.id === "mercadopago") return <SiMercadopago size={20} color={iconColor} />;
      if (method.id === "alias")       return <BankIcon size={18} color={iconColor} />;
      if (method.id === "paypal")      return <SiPaypal size={20} color={iconColor} />;
      if (method.id === "stripe")      return <SiStripe size={20} color={iconColor} />;
      return null;
    }
    return (
      <button
        disabled={!method.available}
        onClick={() => method.available && onSelect(method)}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200"
        style={{
          background: hov && method.available ? "rgba(255,112,67,0.05)" : "rgba(37,52,63,0.03)",
          border: `1.5px solid ${hov && method.available ? "#FF7043" : "rgba(37,52,63,0.09)"}`,
          opacity: method.available ? 1 : 0.42,
          cursor: method.available ? "pointer" : "not-allowed",
        }}
      >
        <div className="flex items-center gap-2.5 flex-1">
          {renderLogo()}
          <span className="text-sm font-medium" style={{ color: hov && method.available ? "#FF7043" : "#25343F" }}>
            {method.label}
          </span>
        </div>
        {!method.available ? (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-widest"
            style={{ background: "rgba(37,52,63,0.07)", color: "rgba(37,52,63,0.35)" }}>PRONTO</span>
        ) : (
          <ArrowRight size={13} style={{ color: hov ? "#FF7043" : "rgba(37,52,63,0.25)" }} />
        )}
      </button>
    );
  }

  return (
    <motion.div key="s2"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
    >
      <h2 className="text-[20px] font-semibold mb-6 text-center" style={{ color: "#25343F", letterSpacing: "-0.022em" }}>
        {SUPPORT_COPY.method.title}
      </h2>
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-2.5">
          <MapPin size={11} color="rgba(37,52,63,0.32)" />
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(37,52,63,0.32)" }}>Argentina</span>
        </div>
        <div className="flex flex-col gap-2">{arg.map((m) => <MethodBtn key={m.id} method={m} />)}</div>
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <Globe size={11} color="rgba(37,52,63,0.32)" />
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(37,52,63,0.32)" }}>Internacional</span>
        </div>
        <div className="flex flex-col gap-2">{intl.map((m) => <MethodBtn key={m.id} method={m} />)}</div>
      </div>
      <button onClick={onBack} className="mt-5 w-full flex items-center justify-center gap-1 py-2.5 text-sm"
        style={{ color: "rgba(37,52,63,0.38)" }}>
        <ChevronLeft size={13} /> Volver
      </button>
    </motion.div>
  );
}

function StepAmount({ method, onBack }: { method: SupportMethod; onBack: () => void }) {
  const [selected, setSelected]   = useState<string>("guia");
  const [freeAmt, setFreeAmt]     = useState("");
  const [showAlias, setShowAlias] = useState(false);
  const [copied, setCopied]       = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePay = () => {
    if (method.id === "alias") { setShowAlias(true); return; }
    const link = PAYMENT_LINKS[method.id]?.[selected];
    if (link) window.open(link, "_blank");
    else setShowAlias(true);
  };

  if (showAlias) return (
    <motion.div key="alias"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3"
          style={{ background: "rgba(37,52,63,0.05)", border: "1.5px solid rgba(37,52,63,0.1)" }}>
          <BankIcon size={24} color="#25343F" />
        </div>
        <h2 className="text-[20px] font-semibold" style={{ color: "#25343F", letterSpacing: "-0.022em" }}>
          Datos de transferencia
        </h2>
        <p className="text-xs mt-1" style={{ color: "rgba(37,52,63,0.45)" }}>Realizá la transferencia y listo</p>
      </div>
      <div className="flex flex-col gap-2.5 mb-5">
        {BANK_DATA.alias && (
          <div className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: "rgba(37,52,63,0.04)", border: "1.5px solid rgba(37,52,63,0.08)" }}>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(37,52,63,0.3)" }}>Alias</div>
              <div className="text-sm font-semibold" style={{ color: "#25343F", fontFamily: "monospace" }}>{BANK_DATA.alias}</div>
            </div>
            <button onClick={() => copy(BANK_DATA.alias, "alias")} className="p-2 rounded-lg"
              style={{ background: copied === "alias" ? "rgba(255,112,67,0.1)" : "rgba(37,52,63,0.06)" }}>
              {copied === "alias" ? <Check size={13} style={{ color: "#FF7043" }} /> : <Copy size={13} style={{ color: "rgba(37,52,63,0.35)" }} />}
            </button>
          </div>
        )}
        {BANK_DATA.cbu && (
          <div className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: "rgba(37,52,63,0.04)", border: "1.5px solid rgba(37,52,63,0.08)" }}>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(37,52,63,0.3)" }}>CBU</div>
              <div style={{ color: "#25343F", fontFamily: "monospace", fontSize: 11, fontWeight: 600 }}>{BANK_DATA.cbu}</div>
            </div>
            <button onClick={() => copy(BANK_DATA.cbu, "cbu")} className="p-2 rounded-lg"
              style={{ background: copied === "cbu" ? "rgba(255,112,67,0.1)" : "rgba(37,52,63,0.06)" }}>
              {copied === "cbu" ? <Check size={13} style={{ color: "#FF7043" }} /> : <Copy size={13} style={{ color: "rgba(37,52,63,0.35)" }} />}
            </button>
          </div>
        )}
        <div className="px-4 py-3 rounded-xl"
          style={{ background: "rgba(37,52,63,0.04)", border: "1.5px solid rgba(37,52,63,0.08)" }}>
          <div className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(37,52,63,0.3)" }}>Titular</div>
          <div className="text-sm font-semibold" style={{ color: "#25343F" }}>{BANK_DATA.titular}</div>
        </div>
      </div>
      <button onClick={() => setShowAlias(false)} className="w-full flex items-center justify-center gap-1 py-2.5 text-sm"
        style={{ color: "rgba(37,52,63,0.38)" }}>
        <ChevronLeft size={13} /> Volver
      </button>
    </motion.div>
  );

  const freeActive = selected === "libre";
  const freeActive = selected === "libre";
  const canPay = selected && (selected !== "libre" || freeAmt.length > 0);

  return (
    <motion.div key="s3"
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
    >
      <h2 className="text-[20px] font-semibold mb-1 text-center" style={{ color: "#25343F", letterSpacing: "-0.022em" }}>
        {SUPPORT_COPY.amount.title}
      </h2>
      <p className="text-xs text-center mb-5" style={{ color: "rgba(37,52,63,0.4)" }}>vía {method.label}</p>

      <div className="flex flex-col gap-2 mb-3">
        {SUPPORT_TIERS.map((tier) => {
          const active = selected === tier.id;
          const TierIcon = TIER_ICONS[tier.id];
          const iconColor = active ? "#FF7043" : "rgba(37,52,63,0.35)";
          return (
            <button key={tier.id} onClick={() => setSelected(tier.id)}
              className="w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200"
              style={{
                background: active ? (tier.highlight ? "rgba(255,112,67,0.07)" : "rgba(37,52,63,0.05)") : "rgba(37,52,63,0.03)",
                border: `1.5px solid ${active ? (tier.highlight ? "#FF7043" : "rgba(37,52,63,0.22)") : "rgba(37,52,63,0.08)"}`,
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3"
                style={{
                  background: active ? "rgba(255,112,67,0.1)" : "rgba(37,52,63,0.05)",
                  border: `1px solid ${active ? "rgba(255,112,67,0.2)" : "rgba(37,52,63,0.08)"}`,
                }}>
                {TierIcon && <TierIcon size={16} color={iconColor} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: "#25343F" }}>{tier.label}</div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="flex items-baseline gap-1 justify-end">
                  <span className="text-base font-bold"
                    style={{ color: active && tier.highlight ? "#FF7043" : "#25343F" }}>
                    ${tier.amountARS.toLocaleString("es-AR")}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: "rgba(37,52,63,0.3)" }}>ARS</span>
                </div>
                <div className="text-[11px]" style={{ color: "rgba(37,52,63,0.38)" }}>USD {tier.amountUSD}</div>
                {tier.badge && (
                  <div className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 inline-block tracking-wide"
                    style={{ background: "rgba(255,112,67,0.11)", color: "#FF7043" }}>
                    {tier.badge.toUpperCase()}
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {/* Monto libre */}
        <button onClick={() => setSelected("libre")}
          className="w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200"
          style={{
            background: freeActive ? "rgba(37,52,63,0.05)" : "rgba(37,52,63,0.03)",
            border: `1.5px solid ${freeActive ? "rgba(37,52,63,0.22)" : "rgba(37,52,63,0.08)"}`,
          }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mr-3"
            style={{
              background: freeActive ? "rgba(0,180,216,0.1)" : "rgba(37,52,63,0.05)",
              border: `1px solid ${freeActive ? "rgba(0,180,216,0.2)" : "rgba(37,52,63,0.08)"}`,
            }}>
            <Heart size={16} color={freeActive ? "#00B4D8" : "rgba(37,52,63,0.35)"} />
          </div>
          <div className="text-sm font-semibold" style={{ color: "#25343F" }}>
            {SUPPORT_COPY.amount.freeLabel}
          </div>
        </button>
      </div>

      <AnimatePresence>
        {selected === "libre" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-3">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl mt-1"
              style={{ border: "1.5px solid rgba(37,52,63,0.14)", background: "rgba(37,52,63,0.03)" }}>
              <span className="text-sm font-bold" style={{ color: "rgba(37,52,63,0.35)" }}>$</span>
              <input type="number" value={freeAmt} onChange={(e) => setFreeAmt(e.target.value)}
                placeholder={SUPPORT_COPY.amount.freePlaceholder}
                className="flex-1 bg-transparent text-sm outline-none" style={{ color: "#25343F" }} autoFocus />
              <span className="text-[10px] font-bold" style={{ color: "rgba(37,52,63,0.4)" }}>ARS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={handlePay} disabled={!canPay}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 mb-3"
        style={{
          background: canPay ? "#FF7043" : "rgba(37,52,63,0.07)",
          color: canPay ? "white" : "rgba(37,52,63,0.28)",
          cursor: canPay ? "pointer" : "not-allowed",
        }}
        onMouseEnter={(e) => { if (canPay) (e.currentTarget as HTMLButtonElement).style.background = "#E64A19"; }}
        onMouseLeave={(e) => { if (canPay) (e.currentTarget as HTMLButtonElement).style.background = "#FF7043"; }}>
        {SUPPORT_COPY.amount.cta} <ArrowRight size={14} />
      </button>
      <button onClick={onBack} className="w-full flex items-center justify-center gap-1 py-2 text-sm"
        style={{ color: "rgba(37,52,63,0.38)" }}>
        <ChevronLeft size={13} /> Volver
      </button>
    </motion.div>
  );
}

export default function SupportModal({ isOpen, onClose }: Props) {
  const [step, setStep]     = useState<Step>(1);
  const [method, setMethod] = useState<SupportMethod | null>(null);

  useEffect(() => { if (isOpen) { setStep(1); setMethod(null); } }, [isOpen]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9990]"
            style={{ background: "rgba(37,52,63,0.65)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[9991] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-sm rounded-2xl overflow-hidden pointer-events-auto"
              style={{ background: "#F7F7F5", boxShadow: "0 32px 80px rgba(37,52,63,0.2), 0 8px 24px rgba(37,52,63,0.08)" }}
              initial={{ scale: 0.93, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.93, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div className="h-1.5"
                style={{ background: "linear-gradient(90deg, #FF7043 0%, #FFD54F 50%, #00B4D8 100%)" }} />
              <button onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg z-10"
                style={{ background: "rgba(37,52,63,0.07)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(37,52,63,0.13)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(37,52,63,0.07)")}>
                <X size={13} style={{ color: "rgba(37,52,63,0.45)" }} />
              </button>
              <div className="px-6 pt-6 pb-7">
                <ProgressDots step={step} />
                <AnimatePresence mode="wait">
                  {step === 1 && <StepIntro onNext={() => setStep(2)} />}
                  {step === 2 && <StepMethod onSelect={(m) => { setMethod(m); setStep(3); }} onBack={() => setStep(1)} />}
                  {step === 3 && method && <StepAmount method={method} onBack={() => setStep(2)} />}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}