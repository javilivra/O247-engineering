# O247 – FRONTEND DESIGN ENFORCEMENT
Version: 1.0
Authority Level: CRITICAL
Applies To: Gemini, Claude, Copilot and any AI generating UI code

This document enforces the official O247 Design System.
No visual improvisation is allowed.

If generated code deviates from this system, it is considered a critical implementation error.

---

# 1. CORE PHILOSOPHY: "OASIS TECH"

O247 balances:

Oasis → Calm, low cognitive load
Tech → Precision, structured intelligence

All UI must respect this duality.

---

# 2. OFFICIAL COLOR TOKENS (IMMUTABLE)

The following colors are the only valid brand tokens.

## Base Oasis (Dominant – 60%)
Name: bone
HEX: #f7f7f5
Tailwind: bg-bone

Usage:
- Page background
- Card background (white allowed over bone)
- Negative space

---

## Tech Dark (Structure – 30%)
Name: gunmetal
HEX: #25343F
Tailwind: text-gunmetal

Usage:
- Primary text
- Icons
- Borders (with opacity)
- Structural elements

---

## Action Solar (Primary Accent – 7%)
Name: sunset
HEX: #FF7043
Tailwind: bg-sunset

Usage:
- Primary CTA buttons
- Urgency elements
- Critical highlights

Text on sunset MUST be text-gunmetal.
Never white.

---

## Tech Flow (Secondary Accent – 3%)
Name: celeste
HEX: #00B4D8
Tailwind: bg-celeste

Usage:
- AI indicators
- Informational highlights
- Technical states

Text on celeste MUST be text-gunmetal.
Never white.

---

# 3. STRICT COLOR RULES

- Follow 60-30-10 distribution.
- Do not introduce new grays.
- Use gunmetal with opacity (e.g. text-gunmetal/70).
- Never use generic Tailwind gray scale.
- Never hardcode HEX values inline.
- Never use gradients except those officially defined.

---

# 4. OFFICIAL TYPOGRAPHY SYSTEM

## Primary Font (Narrative Layer)
Google Sans Flex (Variable)

Use for:
- Headings
- Paragraphs
- Structural UI

---

## Secondary Font (Precision Layer)
JetBrains Mono

Use for:
- Numerical values
- Dates
- Prices
- System states
- AI output labels
- Technical metadata

Never use JetBrains Mono for long paragraphs.

---

# 5. SEMANTIC TYPE CLASSES (MANDATORY)

The following abstractions must exist in globals.css:

.type-display  
→ High impact headings  
→ font-sans font-black tracking-tighter leading-none text-gunmetal  

.type-body  
→ Reading paragraphs  
→ font-sans text-base font-normal leading-relaxed text-gunmetal/80  

.type-tech  
→ Data / Technical UI  
→ font-mono font-medium tracking-wider leading-tight text-gunmetal  

AI must use these classes instead of raw utility stacking.

---

# 6. BUTTON HIERARCHY

Primary Button:
- bg-sunset
- text-gunmetal
- No white text allowed

Secondary Button:
- Transparent or bg-bone
- border-gunmetal/20
- text-gunmetal

Tech Button:
- text-celeste or icon-celeste

---

# 7. ACCESSIBILITY GUARDRAILS

- Never use white text on sunset or celeste.
- Maintain WCAG contrast.
- Do not create visual competition with multiple sunset elements.

If more than two sunset elements compete on a screen, hierarchy is broken.

---

# 8. AI EXECUTION RULE

Before generating any UI component, AI must:

1. Confirm use of official tokens.
2. Use Tailwind theme extensions.
3. Avoid inline styles.
4. Respect typography layering.
5. Avoid stylistic improvisation.

If tokens are not present in tailwind.config.ts,
AI must request implementation before proceeding.
