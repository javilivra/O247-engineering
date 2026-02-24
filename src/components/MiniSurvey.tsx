"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "./ScrollReveal";
import TextReveal from "./TextReveal";

// ============================================================
// DATA
// ============================================================

const QUESTIONS = [
  {
    id: "experience",
    question: "¿Es tu primera vez en Orlando?",
    feedback: {
      first: "Perfecto. Vamos a empezar desde lo esencial.",
      returning: "Genial. Vamos a saltear lo obvio y enfocarnos en lo nuevo.",
      expert: "Un conocedor. Vamos directo a lo que cambió desde tu última visita.",
    },
    options: [
      { id: "first", label: "Sí, primera vez", icon: "solar:star-bold-duotone", feedbackKey: "first" },
      { id: "returning", label: "Ya fui antes", icon: "solar:refresh-circle-bold-duotone", feedbackKey: "returning" },
      { id: "expert", label: "Lo conozco muy bien", icon: "solar:crown-bold-duotone", feedbackKey: "expert" },
    ],
  },
  {
    id: "group",
    question: "¿Con quién viajás?",
    feedback: {
      family_kids: "Familias con niños necesitan más pausas y rutas con sombra. Lo tenemos en cuenta.",
      family_no_kids: "Familia sin niños = más flexibilidad y ritmo propio.",
      couple: "Menos logística, más experiencias. Anotado.",
      friends: "Ritmo flexible y más libertad para improvisar.",
      group: "Grupos grandes necesitan coordinación extra. Lo contemplamos.",
      solo: "Viaje solo = máxima eficiencia. Buen plan.",
    },
    options: [
      { id: "family_kids", label: "Familia con niños", icon: "solar:users-group-rounded-bold-duotone", feedbackKey: "family_kids" },
      { id: "family_no_kids", label: "Familia sin niños", icon: "solar:people-nearby-bold-duotone", feedbackKey: "family_no_kids" },
      { id: "couple", label: "Pareja", icon: "solar:heart-bold-duotone", feedbackKey: "couple" },
      { id: "friends", label: "Amigos", icon: "solar:cup-star-bold-duotone", feedbackKey: "friends" },
      { id: "group", label: "Grupo grande", icon: "solar:users-group-two-rounded-bold-duotone", feedbackKey: "group" },
      { id: "solo", label: "Viajo solo/a", icon: "solar:user-bold-duotone", feedbackKey: "solo" },
    ],
  },
  {
    id: "duration",
    question: "¿Cuántos días tenés para parques?",
    feedback: {
      short: "Con pocos días, cada hora cuenta. Vamos a priorizarte lo imprescindible.",
      medium: "Buen rango. Se puede cubrir lo principal sin correr.",
      long: "Tiempo suficiente para explorar sin estrés.",
    },
    options: [
      { id: "short", label: "1 a 3 días", icon: "solar:clock-circle-bold-duotone", feedbackKey: "short" },
      { id: "medium", label: "4 a 6 días", icon: "solar:calendar-bold-duotone", feedbackKey: "medium" },
      { id: "long", label: "7 o más", icon: "solar:calendar-mark-bold-duotone", feedbackKey: "long" },
    ],
  },
  {
    id: "travel_date",
    question: "¿Cuándo pensás viajar?",
    feedback: {
      soon: "Pronto. Vamos a darte lo más relevante y urgente primero.",
      this_year: "Tiempo suficiente para planificar bien. Ideal.",
      next_year: "Con tiempo de sobra podés planificar sin presión.",
      no_date: "Sin fecha definida. Vas a encontrar todo cuando lo necesites.",
    },
    options: [
      { id: "soon", label: "En los próximos 3 meses", icon: "solar:rocket-bold-duotone", feedbackKey: "soon" },
      { id: "this_year", label: "En los próximos 6 meses", icon: "solar:calendar-bold-duotone", feedbackKey: "this_year" },
      { id: "next_year", label: "En más de 6 meses", icon: "solar:calendar-mark-bold-duotone", feedbackKey: "next_year" },
      { id: "no_date", label: "Todavía no sé", icon: "solar:question-circle-bold-duotone", feedbackKey: "no_date" },
    ],
  },
  {
    id: "budget",
    question: "¿Cómo describirías tu presupuesto para el viaje?",
    feedback: {
      tight: "Optimizar el presupuesto sin sacrificar experiencia. Se puede.",
      balanced: "Equilibrio entre experiencia y costo. Hay muchas opciones.",
      flexible: "Con presupuesto flexible, podés elegir lo mejor en cada momento.",
    },
    options: [
      { id: "tight", label: "Ajustado, quiero maximizar cada peso", icon: "solar:wallet-bold-duotone", feedbackKey: "tight" },
      { id: "balanced", label: "Equilibrado, sin excesos", icon: "solar:graph-new-bold-duotone", feedbackKey: "balanced" },
      { id: "flexible", label: "Flexible, priorizo la experiencia", icon: "solar:stars-bold-duotone", feedbackKey: "flexible" },
    ],
  },
  {
    id: "visa",
    question: "¿Tenés VISA de ingreso a Estados Unidos?",
    feedback: {
      yes: "Excelente. Un paso menos del que preocuparse.",
      in_process: "Bien. Mientras se tramita, podés ir planificando todo lo demás.",
      no: "Sin problema. Podés explorar toda la información y planificar antes de tramitarla.",
    },
    options: [
      { id: "yes", label: "Sí, ya la tengo", icon: "solar:check-circle-bold-duotone", feedbackKey: "yes" },
      { id: "in_process", label: "Estoy tramitándola", icon: "solar:clock-circle-bold-duotone", feedbackKey: "in_process" },
      { id: "no", label: "Todavía no", icon: "solar:document-bold-duotone", feedbackKey: "no" },
    ],
  },
  {
    id: "priority",
    question: "¿Qué te preocupa más al planificar?",
    feedback: {
      time: "Reducir esperas es clave. Hay formas concretas de lograrlo.",
      money: "Optimizar el presupuesto sin sacrificar experiencia. Se puede.",
      overwhelm: "Sentirse abrumado es el error más común. Vamos a simplificarte todo.",
      kids: "Planificar con niños tiene reglas propias. Las cubrimos todas.",
    },
    options: [
      { id: "time", label: "Perder tiempo en filas", icon: "solar:hourglass-bold-duotone", feedbackKey: "time" },
      { id: "money", label: "Gastar de más", icon: "solar:wallet-bold-duotone", feedbackKey: "money" },
      { id: "overwhelm", label: "No saber por dónde empezar", icon: "solar:question-circle-bold-duotone", feedbackKey: "overwhelm" },
      { id: "kids", label: "Que los chicos se cansen", icon: "solar:sleeping-square-bold-duotone", feedbackKey: "kids" },
    ],
  },
  {
    id: "perfect_trip",
    question: "¿Qué haría de tu viaje una experiencia perfecta?",
    feedback: {
      schedule: "Paso a paso, sin sorpresas. Eso es exactamente lo que hacemos.",
      knowledge: "Conocer antes de ir cambia todo. Acá vas a encontrar eso.",
      optimize: "Toda la información organizada para que no pierdas nada.",
      logistics: "Saber cuándo, cómo y qué gestionar es la mitad del viaje.",
      tools: "Apps y herramientas explicadas para que las uses con confianza.",
      delegate: "Cuando las herramientas avanzadas estén listas, vas a ser el primero en saberlo.",
      support: "Asistencia continua es parte de nuestra visión. Se viene.",
    },
    options: [
      { id: "schedule", label: "Cronograma paso a paso, todo explicado", icon: "solar:checklist-bold-duotone", feedbackKey: "schedule" },
      { id: "knowledge", label: "Conocer todo de antemano", icon: "solar:book-bookmark-bold-duotone", feedbackKey: "knowledge" },
      { id: "optimize", label: "Toda la info de parques y atracciones organizada", icon: "solar:sort-vertical-bold-duotone", feedbackKey: "optimize" },
      { id: "logistics", label: "Saber cuándo viajar, cómo y qué tramitar", icon: "solar:map-bold-duotone", feedbackKey: "logistics" },
      { id: "tools", label: "Dominar las apps y herramientas del viaje", icon: "solar:smartphone-2-bold-duotone", feedbackKey: "tools" },
      { id: "delegate", label: "Que lo organicen todo por mí", icon: "solar:hand-stars-bold-duotone", feedbackKey: "delegate" },
      { id: "support", label: "Asistencia 24/7 durante mi visita", icon: "solar:headphones-round-bold-duotone", feedbackKey: "support" },
    ],
  },
  {
    id: "source",
    question: "¿Cómo llegaste a O247?",
    feedback: {
      google: "Gracias por encontrarnos.",
      instagram: "Gracias por seguirnos. Acá va lo bueno de verdad.",
      tiktok: "De TikTok a la planificación real. Bienvenido/a.",
      youtube: "De YouTube a O247. Ahora vas a ver todo.",
      twitter: "De X a O247. Bienvenido/a.",
      friend: "Las mejores recomendaciones vienen de alguien que ya lo probó.",
      other: "Sin importar cómo llegaste, bienvenido/a.",
    },
    options: [
      { id: "google", label: "Google", icon: "solar:magnifer-bold-duotone", feedbackKey: "google" },
      { id: "instagram", label: "Instagram", icon: "solar:camera-bold-duotone", feedbackKey: "instagram" },
      { id: "tiktok", label: "TikTok", icon: "solar:clapperboard-play-bold-duotone", feedbackKey: "tiktok" },
      { id: "youtube", label: "YouTube", icon: "solar:play-bold-duotone", feedbackKey: "youtube" },
      { id: "twitter", label: "X / Twitter", icon: "solar:chat-round-bold-duotone", feedbackKey: "twitter" },
      { id: "friend", label: "Recomendación", icon: "solar:user-speak-bold-duotone", feedbackKey: "friend" },
      { id: "other", label: "Otro", icon: "solar:link-bold-duotone", feedbackKey: "other" },
    ],
  },
];

// ============================================================
// SUMMARY LABELS — para el resumen visual antes del email
// ============================================================

const SUMMARY_LABELS: Record<string, Record<string, string>> = {
  experience: { first: "Primera vez", returning: "Ya fui antes", expert: "Lo conozco bien" },
  group: { family_kids: "Familia con niños", family_no_kids: "Familia sin niños", couple: "En pareja", friends: "Con amigos", group: "Grupo grande", solo: "Solo/a" },
  duration: { short: "1-3 días", medium: "4-6 días", long: "7+ días" },
  travel_date: { soon: "En 3 meses", this_year: "En 6 meses", next_year: "Más de 6 meses", no_date: "Sin fecha" },
  budget: { tight: "Presupuesto ajustado", balanced: "Presupuesto equilibrado", flexible: "Presupuesto flexible" },
  visa: { yes: "Con visa", in_process: "Tramitando visa", no: "Sin visa aún" },
};

const SUMMARY_ICONS: Record<string, string> = {
  experience: "solar:star-bold-duotone",
  group: "solar:users-group-rounded-bold-duotone",
  duration: "solar:calendar-bold-duotone",
  travel_date: "solar:rocket-bold-duotone",
  budget: "solar:wallet-bold-duotone",
  visa: "solar:document-bold-duotone",
};

// ============================================================
// ANALYTICS
// ============================================================

function trackSurveyEvent(event: string, data?: Record<string, unknown>) {
  const payload = { event: `o247_survey_${event}`, timestamp: new Date().toISOString(), ...data };
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push(payload);
  }
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/survey-events", JSON.stringify(payload));
  } else if (typeof fetch !== "undefined") {
    fetch("/api/survey-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
  if (process.env.NODE_ENV === "development") {
    console.log(`[O247 Survey] ${event}`, data);
  }
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

// Resumen visual de respuestas
function SummaryCard({ answers }: { answers: Record<string, string> }) {
  const items = Object.entries(SUMMARY_LABELS)
    .map(([key, labels]) => {
      const val = answers[key];
      if (!val) return null;
      return { key, icon: SUMMARY_ICONS[key], label: labels[val] };
    })
    .filter(Boolean) as { key: string; icon: string; label: string }[];

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-gunmetal/8 shadow-sm"
        >
          <Icon icon={item.icon} width={13} className="text-sunset shrink-0" />
          <span className="text-[11px] font-semibold text-gunmetal/70">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Pantalla de email
function EmailStep({
  answers,
  onSubmit,
  onSkip,
}: {
  answers: Record<string, string>;
  onSubmit: (email: string) => void;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  useEffect(() => {
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSending(true);
    trackSurveyEvent("email_submitted", { answers });
    await new Promise((r) => setTimeout(r, 600));
    onSubmit(email);
  };

  return (
    <motion.div
      key="email-step"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Resumen */}
      <SummaryCard answers={answers} />

      {/* Título */}
      <h3 className="type-display text-xl sm:text-2xl md:text-3xl text-gunmetal mb-3 leading-tight">
        Armamos tu punto de partida personalizado.
      </h3>
      <p className="type-body text-sm sm:text-base text-gunmetal/50 mb-8 max-w-md leading-relaxed">
        Basado en tus respuestas, te enviamos una guía con el camino más directo para planificar tu viaje.
      </p>

      {/* Input email */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <div className="relative flex-1">
          <Icon
            icon="solar:letter-bold-duotone"
            width={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gunmetal/30 pointer-events-none"
          />
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="tu@email.com"
            className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gunmetal/10 bg-white text-sm text-gunmetal placeholder:text-gunmetal/25 focus:outline-none focus:border-sunset/50 focus:shadow-[0_0_0_3px_rgba(255,112,67,0.08)] transition-all duration-300"
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!isValid || isSending}
          className={`px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
            isValid
              ? "bg-gunmetal text-white shadow-lg shadow-gunmetal/15 hover:shadow-xl hover:shadow-gunmetal/20 hover:-translate-y-0.5"
              : "bg-gunmetal/10 text-gunmetal/30 cursor-not-allowed"
          }`}
        >
          {isSending ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            >
              <Icon icon="solar:refresh-bold" width={16} />
            </motion.div>
          ) : (
            <>
              <Icon icon="solar:arrow-right-bold" width={16} />
              Recibir guía
            </>
          )}
        </motion.button>
      </div>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="mt-5 text-xs text-gunmetal/30 hover:text-gunmetal/60 font-bold uppercase tracking-widest transition-colors"
      >
        Prefiero no dejar mi email
      </button>
    </motion.div>
  );
}





// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MiniSurvey() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [skipped, setSkipped] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showEmailStep, setShowEmailStep] = useState(false);
  const [selectedAnim, setSelectedAnim] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedView = useRef(false);

  const totalSteps = QUESTIONS.length;
  // +1 para el email step en la barra de progreso
  const progress = isComplete ? 100 : showEmailStep ? 95 : ((currentStep + 1) / (totalSteps + 1)) * 100;
  const currentQ = QUESTIONS[currentStep];

  // Track section view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasTrackedView.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackSurveyEvent("section_viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const advanceStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Última pregunta completada → ir al email step
      setShowEmailStep(true);
    }
  }, [currentStep, totalSteps]);

  const handleAnswer = useCallback(
    (questionId: string, optionId: string, feedbackKey: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
      setSelectedAnim(optionId);
      trackSurveyEvent("answer", { questionId, optionId });

      const fb = currentQ.feedback[feedbackKey as keyof typeof currentQ.feedback];

      setTimeout(() => {
        setShowFeedback(fb || null);
        setSelectedAnim(null);
        setTimeout(() => {
          setShowFeedback(null);
          advanceStep();
        }, 900); // más ágil: 900ms en vez de 1400ms
      }, 350);
    },
    [currentQ, advanceStep]
  );

  const handleSkipQuestion = () => {
    setSkipped((prev) => new Set(prev).add(currentQ.id));
    trackSurveyEvent("skip", { questionId: currentQ.id });
    setShowFeedback(null);
    advanceStep();
  };

  const handleGoBack = () => {
    if (showEmailStep) {
      setShowEmailStep(false);
      return;
    }
    if (currentStep > 0) {
      setShowFeedback(null);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDismiss = () => {
    trackSurveyEvent("dismissed", { atStep: currentStep, answers, skipped: Array.from(skipped) });
    setIsActive(false);
    setIsComplete(false);
    setShowEmailStep(false);
    setCurrentStep(0);
    setAnswers({});
    setSkipped(new Set());
  };

  const handleStart = () => {
    trackSurveyEvent("started");
    setIsActive(true);
  };

  const handleEmailSubmit = async (email: string) => {
    trackSurveyEvent("lead_captured", { email, answers, skipped: Array.from(skipped) });
    await submitSurvey({ email, answers, skipped: Array.from(skipped) });
    setShowEmailStep(false);
    setIsComplete(true);
  };

  const handleEmailSkip = async () => {
    trackSurveyEvent("email_skipped", { answers });
    await submitSurvey({ answers, skipped: Array.from(skipped) });
    setShowEmailStep(false);
    setIsComplete(true);
  };

  // ======== NO INICIADO ========
  if (!isActive) {
    return (
      <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-bone border-t border-gunmetal/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest mb-4 block">
              Opcional — 2 minutos
            </span>
          </ScrollReveal>
          <TextReveal
            className="type-display text-3xl sm:text-4xl md:text-5xl text-gunmetal mb-4 leading-tight"
            staggerSpeed={20}
          >
            Antes de darte respuestas, entendamos tu contexto.
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p
              className="type-body text-base sm:text-lg text-gunmetal/60 max-w-xl mb-10 leading-relaxed"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              9 preguntas rápidas para que el contenido que veas sea relevante para tu viaje. Sin registro, sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(37,52,63,0.15)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                className="px-8 py-4 bg-gunmetal text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <Icon icon="solar:play-bold" width={16} />
                Empezar
              </motion.button>
              <button
                onClick={() => trackSurveyEvent("ignored")}
                className="text-xs text-gunmetal/40 hover:text-gunmetal font-bold uppercase tracking-widest transition-colors py-4"
              >
                Prefiero explorar por mi cuenta
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // ======== COMPLETADO ========
  if (isComplete) {
    return (
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-bone border-t border-gunmetal/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-8"
            >
              <Icon icon="solar:check-circle-bold" width={40} />
            </motion.div>
            <h2
              className="type-display text-2xl sm:text-3xl md:text-4xl text-gunmetal mb-4"
              style={{ overflowWrap: "break-word" }}
            >
              Listo. Ya sabemos por dónde empezar.
            </h2>
            <p
              className="type-body text-base sm:text-lg text-gunmetal/60 max-w-lg mb-10 leading-relaxed"
              style={{ overflowWrap: "break-word" }}
            >
              Con lo que nos contaste, el contenido de O247 ahora tiene más sentido para tu viaje. Explorá a tu ritmo.
            </p>
            <button
              onClick={handleDismiss}
              className="text-xs text-gunmetal/40 hover:text-gunmetal font-bold uppercase tracking-widest transition-colors"
            >
              Continuar
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // ======== EN PROGRESO ========
  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-bone border-t border-gunmetal/5 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="type-tech text-[10px] text-gunmetal/40 uppercase tracking-widest">
            {showEmailStep
              ? "Tu punto de partida"
              : `Pregunta ${currentStep + 1} de ${totalSteps}`}
          </span>
          <button
            onClick={handleDismiss}
            className="flex items-center gap-1.5 text-[10px] text-gunmetal/30 hover:text-gunmetal/60 font-bold uppercase tracking-widest transition-colors"
          >
            <Icon icon="solar:close-circle-linear" width={14} />
            Cerrar
          </button>
        </div>

        {/* Barra de progreso */}
        <div className="w-full h-1.5 bg-gunmetal/5 rounded-full mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sunset to-celeste rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>

        <AnimatePresence mode="wait">

          {/* EMAIL STEP */}
          {showEmailStep ? (
            <EmailStep
              key="email"
              answers={answers}
              onSubmit={handleEmailSubmit}
              onSkip={handleEmailSkip}
            />
          ) : !showFeedback ? (

            /* PREGUNTA */
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h3
                className="type-display text-xl sm:text-2xl md:text-3xl text-gunmetal mb-10 leading-tight"
                style={{ overflowWrap: "break-word" }}
              >
                {currentQ.question}
              </h3>

              <div
                className={`grid gap-3 ${
                  currentQ.options.length <= 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : currentQ.options.length <= 4
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedAnim === opt.id || answers[currentQ.id] === opt.id;
                  const isJustSelected = selectedAnim === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, scale: isJustSelected ? 1.03 : 1 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      whileHover={{
                        y: -3,
                        boxShadow: "0 8px 25px rgba(255,112,67,0.1)",
                        borderColor: "rgba(255,112,67,0.4)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(currentQ.id, opt.id, opt.feedbackKey)}
                      className={`group relative p-4 sm:p-5 text-left rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "bg-white border-sunset shadow-lg shadow-sunset/10"
                          : "bg-white border-transparent shadow-sm hover:shadow-md"
                      }`}
                      style={{ overflowWrap: "break-word" }}
                    >
                      {isJustSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 rounded-2xl bg-sunset/5 pointer-events-none"
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-3">
                        <div
                          className={`shrink-0 p-2.5 rounded-xl transition-all duration-300 ${
                            isSelected
                              ? "bg-sunset text-white shadow-md shadow-sunset/20"
                              : "bg-bone text-gunmetal/50 group-hover:bg-sunset/10 group-hover:text-sunset"
                          }`}
                        >
                          <Icon icon={opt.icon} className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-sm font-bold leading-tight transition-colors duration-300 ${
                            isSelected ? "text-gunmetal" : "text-gunmetal/70 group-hover:text-gunmetal"
                          }`}
                          style={{ overflowWrap: "break-word", hyphens: "auto" }}
                        >
                          {opt.label}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8">
                <div>
                  {currentStep > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ x: -3 }}
                      onClick={handleGoBack}
                      className="flex items-center gap-1.5 text-xs text-gunmetal/40 hover:text-gunmetal font-bold uppercase tracking-widest transition-all"
                    >
                      <Icon icon="solar:arrow-left-linear" width={14} />
                      Anterior
                    </motion.button>
                  )}
                </div>
                <button
                  onClick={handleSkipQuestion}
                  className="text-xs text-gunmetal/30 hover:text-gunmetal/60 font-bold uppercase tracking-widest transition-colors"
                >
                  Prefiero no contestar
                </button>
              </div>
            </motion.div>

          ) : (

            /* FEEDBACK */
            <motion.div
              key={`feedback-${currentStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="py-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-14 rounded-full bg-sunset/10 text-sunset flex items-center justify-center mb-6"
              >
                <Icon icon="solar:check-read-bold" width={28} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="type-body text-lg sm:text-xl text-gunmetal font-medium max-w-md leading-relaxed"
                style={{ overflowWrap: "break-word" }}
              >
                {showFeedback}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}// ============================================================
// SUBMIT TO SUPABASE
// ============================================================
async function submitSurvey(payload: {
  email?: string;
  answers: Record<string, string>;
  skipped: string[];
}) {
  try {
    await fetch('/api/survey-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[MiniSurvey] Submit error:', err);
  }
}
