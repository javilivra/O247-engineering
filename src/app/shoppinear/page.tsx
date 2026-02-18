"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Icon } from '@/components/Icon';

import {
    SHOPPING_CRITERIA,
    SHOPPING_ZONES,
    SAVING_TIPS,
    CUSTOMS_CATEGORIES,
    FL_SALES_TAX,
} from '@/data/shoppinear-data';
import type { ShoppingCategory, ShoppingZone } from '@/data/shoppinear-data';

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] } } };

// ============================================================
// DECISION CARD
// ============================================================

function DecisionCard({ item, index }: { item: ShoppingCategory; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={{ once: true, margin: '-40px' }}
            className="bg-white rounded-2xl border border-gunmetal/10 overflow-hidden shadow-sm"
        >
            {/* Header clickeable */}
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-6 flex items-center justify-between text-left hover:bg-bone/30 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-bone rounded-xl text-gunmetal shrink-0">
                        <Icon icon={item.icon} className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gunmetal">{item.title}</h3>
                        <p className="text-[10px] font-bold font-mono text-gunmetal/40 uppercase tracking-widest mt-0.5">{item.subtitle}</p>
                    </div>
                </div>
                <Icon icon="solar:arrow-right-linear" className={`w-5 h-5 text-gunmetal/30 transition-transform duration-300 ${isOpen ? 'rotate-90 text-sunset' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                    >
                        {/* Contexto */}
                        <div className="px-6 pb-4">
                            <p className="text-sm text-gunmetal/70 leading-relaxed">{item.context}</p>
                        </div>

                        {/* Matriz */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gunmetal/5">
                            <div className="p-6 bg-emerald-50/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon icon="solar:check-circle-bold" className="text-emerald-600 w-4 h-4" />
                                    <span className="text-[10px] font-bold font-mono uppercase text-emerald-800 tracking-wider">Tiene sentido si...</span>
                                </div>
                                <ul className="space-y-2.5">
                                    {item.logic.makesSense.map((point, i) => (
                                        <li key={i} className="text-sm text-gunmetal/80 leading-snug flex items-start gap-2">
                                            <span className="block w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-6 bg-rose-50/30">
                                <div className="flex items-center gap-2 mb-3">
                                    <Icon icon="solar:forbidden-circle-bold" className="text-rose-600 w-4 h-4" />
                                    <span className="text-[10px] font-bold font-mono uppercase text-rose-800 tracking-wider">No conviene cuando...</span>
                                </div>
                                <ul className="space-y-2.5">
                                    {item.logic.skipIf.map((point, i) => (
                                        <li key={i} className="text-sm text-gunmetal/80 leading-snug flex items-start gap-2">
                                            <span className="block w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Error comun */}
                        <div className="p-5 bg-gunmetal text-white">
                            <div className="flex items-start gap-3">
                                <Icon icon="solar:bell-bing-bold-duotone" className="text-sunset w-5 h-5 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[9px] font-bold font-mono uppercase tracking-widest text-white/40 mb-1">Error Comun del Viajero</span>
                                    <p className="text-sm font-medium leading-relaxed text-white/85">{item.logic.commonError}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ============================================================
// ZONE CARD
// ============================================================

function ZoneCard({ zone, index }: { zone: ShoppingZone; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const priceLabels = ['', 'ECONOMICO', 'MODERADO', 'PREMIUM'];
    const priceColors = ['', 'text-emerald-600 bg-emerald-50', 'text-amber-600 bg-amber-50', 'text-rose-600 bg-rose-50'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            viewport={{ once: true, margin: '-40px' }}
            className="bg-white rounded-2xl border border-gunmetal/10 overflow-hidden shadow-sm"
        >
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 flex items-center justify-between text-left hover:bg-bone/30 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-2 bg-bone rounded-xl text-gunmetal shrink-0">
                        <Icon icon={zone.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gunmetal truncate">{zone.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] font-mono text-gunmetal/40">{zone.distanceFromParks}</span>
                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${priceColors[zone.priceLevel]}`}>{priceLabels[zone.priceLevel]}</span>
                        </div>
                    </div>
                </div>
                <Icon icon="solar:arrow-right-linear" className={`w-4 h-4 text-gunmetal/30 transition-transform duration-300 shrink-0 ml-3 ${isOpen ? 'rotate-90 text-sunset' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-4">
                            <div>
                                <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-emerald-600 mb-2 block">Que buscar</span>
                                <ul className="space-y-1.5">
                                    {zone.bestFor.map((item, i) => (
                                        <li key={i} className="text-xs text-gunmetal/70 flex items-start gap-2">
                                            <Icon icon="solar:check-circle-bold" className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-rose-600 mb-2 block">Que evitar</span>
                                <ul className="space-y-1.5">
                                    {zone.avoid.map((item, i) => (
                                        <li key={i} className="text-xs text-gunmetal/70 flex items-start gap-2">
                                            <Icon icon="solar:close-circle-bold" className="w-3 h-3 text-rose-400 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-celeste/5 border border-celeste/15 rounded-xl p-3">
                                <p className="text-xs text-gunmetal/70">
                                    <Icon icon="solar:lightbulb-bold" width={12} className="inline text-celeste mr-1" />
                                    <strong className="text-gunmetal">Tip O247:</strong> {zone.tip}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gunmetal/40 font-mono">
                                <Icon icon="solar:clock-circle-linear" width={12} />
                                {zone.hours}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ============================================================
// SECCION: PROTOCOLO DE DECISION
// ============================================================

function ProtocolSection() {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gunmetal/50 mb-2">Cada categoria tiene su propia logica. Abri la que te interese para ver cuando conviene y cuando no.</p>
            {SHOPPING_CRITERIA.map((item, i) => (
                <DecisionCard key={item.id} item={item} index={i} />
            ))}
        </div>
    );
}

// ============================================================
// SECCION: DONDE COMPRAR
// ============================================================

function ZonesSection() {
    const [filter, setFilter] = useState<'all' | 'outlet' | 'park-retail' | 'big-box' | 'mall'>('all');
    const filtered = filter === 'all' ? SHOPPING_ZONES : SHOPPING_ZONES.filter(z => z.type === filter);
    const filters = [
        { id: 'all', label: 'Todas', icon: 'solar:widget-2-bold-duotone' },
        { id: 'outlet', label: 'Outlets', icon: 'solar:bag-bold-duotone' },
        { id: 'park-retail', label: 'Parques', icon: 'solar:star-bold-duotone' },
        { id: 'big-box', label: 'Superstores', icon: 'solar:cart-large-bold-duotone' },
        { id: 'mall', label: 'Malls', icon: 'solar:shop-bold-duotone' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id as any)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                            filter === f.id ? 'bg-gunmetal text-white shadow-md' : 'bg-white text-gunmetal/50 border border-gunmetal/10 hover:border-gunmetal/20'
                        }`}
                    >
                        <Icon icon={f.icon} width={14} />
                        {f.label}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((zone, i) => (
                        <ZoneCard key={zone.id} zone={zone} index={i} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ============================================================
// SECCION: TIPS DE AHORRO
// ============================================================

function TipsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAVING_TIPS.map((tip, i) => (
                <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl border border-gunmetal/10 p-5 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-bone rounded-xl">
                            <Icon icon={tip.icon} className="w-5 h-5 text-gunmetal" />
                        </div>
                        <h4 className="text-sm font-bold text-gunmetal">{tip.title}</h4>
                    </div>
                    <p className="text-xs text-gunmetal/60 leading-relaxed flex-1">{tip.description}</p>
                    <div className="mt-4 pt-3 border-t border-gunmetal/5">
                        <span className="text-[10px] font-bold font-mono text-celeste uppercase tracking-widest">{tip.savings}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

// ============================================================
// SECCION: CALCULADORA DE COMPRAS
// ============================================================

function CalculatorSection() {
    const [priceUSD, setPriceUSD] = useState<string>('');
    const [category, setCategory] = useState('electronics');
    const [localPrice, setLocalPrice] = useState<string>('');

    const price = parseFloat(priceUSD) || 0;
    const local = parseFloat(localPrice) || 0;
    const catData = CUSTOMS_CATEGORIES.find(c => c.id === category);
    const withTax = price * (1 + FL_SALES_TAX);
    const dutyEstimate = price * ((catData?.dutyRate || 0) / 100);
    const totalReal = withTax + dutyEstimate;
    const savings = local > 0 ? local - totalReal : 0;
    const savingsPercent = local > 0 ? ((savings / local) * 100) : 0;
    const isWorthIt = savings > 0;

    return (
        <div className="space-y-6">
            <p className="text-sm text-gunmetal/50">Ingresa el precio del producto en dolares y te mostramos el costo real incluyendo impuestos y estimado de aduana.</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Input panel */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gunmetal/10 p-6 space-y-5">
                    <div>
                        <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-gunmetal/40 mb-2 block">Precio en USD</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gunmetal/30 font-bold">$</span>
                            <input
                                type="number"
                                value={priceUSD}
                                onChange={(e) => setPriceUSD(e.target.value)}
                                placeholder="0.00"
                                className="w-full pl-8 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-celeste focus:ring-0 outline-none text-lg font-bold font-mono text-gunmetal transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-gunmetal/40 mb-2 block">Categoria</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {CUSTOMS_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategory(cat.id)}
                                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                                        category === cat.id ? 'bg-gunmetal text-white shadow-md' : 'bg-bone text-gunmetal/60 hover:bg-gunmetal/5'
                                    }`}
                                >
                                    <Icon icon={cat.icon} width={16} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold font-mono uppercase tracking-widest text-gunmetal/40 mb-2 block">Precio en tu pais (moneda local, opcional)</label>
                        <input
                            type="number"
                            value={localPrice}
                            onChange={(e) => setLocalPrice(e.target.value)}
                            placeholder="Para comparar si conviene"
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-celeste focus:ring-0 outline-none text-sm font-mono text-gunmetal transition-colors"
                        />
                    </div>
                </div>

                {/* Result panel */}
                <div className="lg:col-span-2">
                    <div className="bg-gunmetal text-white rounded-2xl shadow-2xl overflow-hidden sticky top-24">
                        <div className="px-6 py-4 bg-white/5 border-b border-white/10">
                            <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-white/40">Costo Real Estimado</span>
                        </div>

                        <div className="px-6 py-5 space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/50">Precio base</span>
                                <span className="text-sm font-bold font-mono">${price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/50">Sales Tax FL (6.5%)</span>
                                <span className="text-sm font-bold font-mono text-amber-400">+${(price * FL_SALES_TAX).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-white/50">Aduana est. ({catData?.dutyRate || 0}%)</span>
                                <span className="text-sm font-bold font-mono text-amber-400">+${dutyEstimate.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-3 flex justify-between items-end">
                                <span className="text-xs font-bold text-white/70 uppercase">Total real</span>
                                <span className="text-2xl font-black font-mono">${totalReal.toFixed(2)}</span>
                            </div>

                            {local > 0 && (
                                <div className={`mt-3 p-3 rounded-xl ${isWorthIt ? 'bg-emerald-500/15' : 'bg-rose-500/15'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Icon icon={isWorthIt ? 'solar:check-circle-bold' : 'solar:close-circle-bold'} width={16} className={isWorthIt ? 'text-emerald-400' : 'text-rose-400'} />
                                        <span className={`text-xs font-bold ${isWorthIt ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {isWorthIt ? 'Conviene comprar en Orlando' : 'No conviene, es mas caro'}
                                        </span>
                                    </div>
                                    <span className={`text-lg font-black font-mono ${isWorthIt ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {isWorthIt ? 'Ahorras' : 'Perdes'} {Math.abs(savingsPercent).toFixed(0)}%
                                    </span>
                                </div>
                            )}

                            {catData && (
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-[10px] text-white/40 leading-relaxed">
                                        <Icon icon="solar:info-circle-bold" width={12} className="inline text-celeste mr-1" />
                                        {catData.notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============================================================
// ACCORDION
// ============================================================

const SECTION_LABELS = ['UNO', 'DOS', 'TRES', 'CUATRO'];

function ShoppinearAccordion() {
    const [openSections, setOpenSections] = useState<number[]>([]);
    const toggleSection = (index: number) => setOpenSections(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);

    const sections = [
        { id: 0, title: 'Protocolo de Decision', icon: 'solar:clipboard-check-bold-duotone', component: <ProtocolSection /> },
        { id: 1, title: 'Donde Comprar', icon: 'solar:map-point-bold-duotone', component: <ZonesSection /> },
        { id: 2, title: 'Tips de Ahorro Real', icon: 'solar:piggy-bank-bold-duotone', component: <TipsSection /> },
        { id: 3, title: 'Calculadora de Compras', icon: 'solar:calculator-bold-duotone', component: <CalculatorSection /> },
    ];

    return (
        <div className="flex flex-col gap-6">
            {sections.map((section, idx) => (
                <div key={section.id}>
                    <div onClick={() => toggleSection(section.id)} className={`relative z-10 bg-white rounded-2xl p-4 pr-6 flex items-center justify-between shadow-sm border cursor-pointer transition-all duration-300 ${openSections.includes(section.id) ? 'border-sunset ring-1 ring-sunset/20' : 'border-transparent hover:border-gunmetal/10'}`}>
                        <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${openSections.includes(section.id) ? 'bg-gunmetal text-white' : 'bg-bone text-gunmetal'}`}>
                                <Icon icon={section.icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="block text-[9px] font-bold text-gunmetal/40 uppercase tracking-widest font-mono mb-0.5">SECCION {SECTION_LABELS[idx]}</span>
                                <span className="font-bold text-gunmetal text-base">{section.title}</span>
                            </div>
                        </div>
                        <Icon icon="solar:arrow-right-linear" className={`transition-transform duration-300 ${openSections.includes(section.id) ? 'rotate-90 text-sunset' : 'text-gunmetal/30'}`} />
                    </div>
                    <AnimatePresence>
                        {openSections.includes(section.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                                className="overflow-hidden bg-white border border-gray-100 rounded-2xl mx-2 shadow-inner"
                            >
                                <div className="p-6">{section.component}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function ShoppinearPage() {
    return (
        <div className="min-h-screen bg-bone pt-0 pb-20 px-6 md:px-12 lg:px-24 font-sans text-gunmetal">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1200px] mx-auto flex flex-col gap-10">

                {/* HERO */}
                <motion.div variants={itemVariants} className="pt-32 pb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-sunset animate-pulse"></span>
                        <span className="text-[10px] font-bold font-mono text-gunmetal/40 uppercase tracking-widest">Protocolo de Decision</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gunmetal leading-[0.9] tracking-tighter mb-6">
                        Compras en<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunset to-celeste">Orlando</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gunmetal/50 max-w-2xl leading-relaxed">
                        O247 no te dice donde comprar mas barato. Te ayudamos a decidir <strong className="text-gunmetal">cuando, por que y para quien</strong> tiene sentido usar el presupuesto.
                    </p>
                </motion.div>

                {/* CONTEXTO VISIBLE - 3 Bloques editoriales */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                        <Icon icon="solar:shield-warning-bold-duotone" className="text-sunset w-7 h-7 mb-3" />
                        <h3 className="font-bold text-gunmetal text-sm mb-2">El Mito del Ahorro</h3>
                        <p className="text-xs text-gunmetal/60 leading-relaxed">Viajar no es sinonimo de comprar. A veces, "aprovechar" una oferta sale mas caro por costos ocultos o falta de uso.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                        <Icon icon="solar:clipboard-check-bold-duotone" className="text-celeste w-7 h-7 mb-3" />
                        <h3 className="font-bold text-gunmetal text-sm mb-2">Criterio &gt; Volumen</h3>
                        <p className="text-xs text-gunmetal/60 leading-relaxed">No busques cantidad. Busca piezas que no existen en tu mercado o que resuelven un problema tecnico.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-gunmetal/5 shadow-sm">
                        <Icon icon="solar:clock-circle-bold-duotone" className="text-emerald-500 w-7 h-7 mb-3" />
                        <h3 className="font-bold text-gunmetal text-sm mb-2">Costo de Oportunidad</h3>
                        <p className="text-xs text-gunmetal/60 leading-relaxed">Pasar 6 horas en un outlet ahorrando $50 es perder 6 horas de vacaciones que valen mucho mas.</p>
                    </div>
                </motion.div>

                {/* SEPARADOR */}
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                    <div className="h-px bg-gunmetal/10 flex-1" />
                    <span className="text-[10px] font-bold font-mono text-gunmetal/30 uppercase tracking-widest">Herramientas y Analisis</span>
                    <div className="h-px bg-gunmetal/10 flex-1" />
                </motion.div>

                {/* ACCORDION */}
                <motion.div variants={itemVariants}>
                    <ShoppinearAccordion />
                </motion.div>

                {/* CTA FINAL */}
                <motion.div variants={itemVariants} className="mt-8">
                    <div className="bg-gunmetal rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sunset/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="relative z-10 max-w-xl">
                            <h2 className="text-2xl md:text-3xl font-black mb-4">Regla de Oro O247</h2>
                            <p className="text-white/60 mb-6 text-sm leading-relaxed">
                                Si todavia no sabes si esa compra grande vale la pena, aplica esto:
                            </p>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                                <p className="text-base font-bold text-white/90 leading-relaxed">
                                    &quot;Si no lo planificaste en casa, no lo necesitas en Orlando.&quot;
                                </p>
                            </div>
                            <a href="/planning/start" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gunmetal rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
                                Volver a la Planificacion
                                <Icon icon="solar:arrow-right-linear" width={14} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <div className="h-20" />
            </motion.div>
        </div>
    );
}