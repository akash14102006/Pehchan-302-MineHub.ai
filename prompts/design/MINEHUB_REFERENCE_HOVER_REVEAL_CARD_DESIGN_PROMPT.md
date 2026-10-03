# MINEHUB.AI — PRAGATI MITRA + HOVER REVEAL CARD SYSTEM IMPLEMENTATION PROMPT

## 1. TASK

Implement the supplied card design exactly as the primary interactive card language for the **MineHub Intelligence Solution**.

The supplied references show three important visual states:

1. Light blue default card.
2. Dark navy hover state created by the circular corner reveal.
3. Four-card enterprise stage/feature row using the same compact rounded-card family.

Reference assets to inspect before coding:

- `199689a0-366e-4a3d-980a-6685ae62eca9.png`
- `6299976a-4be3-47bd-b907-d23367fc56bf.png`
- `1c4a648d-3ee8-4fe4-b28b-874b3fccde80.png`

Also inspect the supplied PRAGATI MITRA frontend/reference implementation before modifying MineHub.

The implementation must preserve the **MineHub domain content** while reproducing the supplied interaction and visual structure.

---

# 2. PRIMARY DESIGN TARGET

The target component is NOT a generic dashboard card.

It is a:

**compact enterprise feature / module / capability card with a corner reveal interaction.**

Visual behavior:

```text
DEFAULT
light cyan surface
dark text
small top-right circular corner
       ↓
HOVER / FOCUS
corner expands diagonally
dark navy surface covers card
title becomes white
body text becomes white/light
arrow remains visible
```

The interaction must feel deliberate and polished.

Do not replace it with:

- glassmorphism;
- gradient-heavy SaaS cards;
- giant floating cards;
- neon;
- glow;
- 3D tilt;
- animated borders;
- particle effects.

---

# 3. EXACT CARD GEOMETRY

Use the supplied reference proportions.

Desktop card:

- compact landscape/medium rectangle;
- approximately 300–400px wide depending on available grid;
- approximately 250–320px tall for larger feature cards;
- approximately 10–14px border radius;
- internal padding approximately 24–30px;
- `position: relative`;
- `overflow: hidden`.

The card must remain visually compact.

Do not make the card excessively rounded.

Do not turn it into a pill.

---

# 4. DEFAULT CARD SURFACE

Use the reference's light blue/cyan visual family.

Preferred default:

```css
background: linear-gradient(
  to bottom,
  #c3e6ec,
  #a7d1d9
);
```

However, keep the effect subtle.

The default state should feel like a pale institutional information surface rather than a colorful marketing tile.

Text:

- dark charcoal/navy;
- strong title;
- readable description;
- compact spacing.

---

# 5. CARD TITLE

Use:

```css
font-size: 1.5em;
line-height: normal;
font-weight: 700;
```

For MineHub desktop implementation, tune within approximately:

```text
22px–26px
```

Do not use oversized hero typography.

Title should have strong hierarchy.

Examples of MineHub-approved titles:

```text
Deep-Dig RAG
Zero Guess
Evidence Passport
Conflict Court
MineHub Report Studio
GeoMap
Agent Bench
Workflow Orchestration
```

Only render actual MineHub features that already exist in the product definition.

Do not invent modules.

---

# 6. CARD BODY TEXT

Use the reference's compact paragraph structure.

Preferred:

```css
font-size: 1em;
font-weight: 400;
line-height: 1.5em;
```

Target approximately:

```text
16px–18px
```

Body copy must be concise.

Do not create paragraphs simply to fill the card.

For MineHub, descriptions should explain the actual function in one concise sentence or the minimum required text.

Examples:

```text
Search across structured and unstructured mining records with evidence-backed retrieval.

Blocks unsupported consequential answers before release.

Connect facts, claims and source evidence through a traceable evidence passport.
```

These are examples of structure only. Use the actual approved MineHub product wording.

---

# 7. CORNER REVEAL

This is the most important visual interaction.

The top-right corner begins as a small circular navy element.

Use the supplied visual behavior:

```css
.go-corner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2em;
  height: 2em;
  overflow: hidden;
  top: 0;
  right: 0;
  background: #384c6c;
  border-radius: 0 4px 0 32px;
}
```

The corner must visually merge into the card's top-right corner.

---

# 8. CORNER REVEAL ANIMATION

Use the reference mechanism:

```css
.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: #384c6c;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card:hover:before {
  transform: scale(28);
}
```

Adapt only as required by the MineHub component architecture.

The result must create a circular diagonal reveal from the top-right corner.

Do NOT replace this interaction with a generic hover color transition.

The defining characteristic is:

```text
small corner
      ↓
circular expansion
      ↓
full dark card
```

---

# 9. HOVER STATE

On hover:

```text
card surface → deep navy
title → white
body → soft white
corner arrow → white
```

Reference behavior:

```css
.card:hover .small-desc {
  color: rgba(255,255,255,0.8);
}

.card:hover .card-title {
  color: #fff;
}
```

Maintain the transition timing around:

```text
0.35s–0.50s
```

Do not make the effect too fast.

Do not make it slow enough to feel sluggish.

---

# 10. ARROW

Place a compact arrow control in the top-right corner.

Reference:

```text
→
```

Keep it simple.

Do not use:

- large CTA text;
- "Learn More";
- "Explore Now";
- animated icon clusters.

The arrow communicates that the card is actionable.

Use a semantic accessible button/link if the card is interactive.

---

# 11. ARROW POSITION

Maintain the compact reference position.

The arrow should sit slightly inward from the extreme corner while remaining visually connected to the corner reveal.

Do not enlarge it unnecessarily.

Do not place it in a separate footer.

---

# 12. CARD INTERACTION MODEL

The entire card should be clickable when it represents a MineHub module.

Use:

```text
card = interactive target
```

Maintain:

- pointer cursor;
- keyboard activation;
- focus state;
- accessible label;
- predictable route/navigation.

Do not create multiple competing click targets inside the same card unless the UX requires them.

---

# 13. KEYBOARD FOCUS

Hover cannot be the only interaction.

Implement equivalent visual behavior for:

```css
.card:focus-visible
.card:focus-within
```

The dark reveal state should be accessible through keyboard focus.

Recommended behavior:

```text
TAB
↓
card receives focus
↓
corner reveal activates
↓
title/body become readable against dark surface
```

Provide a clearly visible focus ring that is separate from the neumorphic/corner effect.

Never use the shadow itself as the only focus indicator.

---

# 14. TOUCH DEVICES

There is no true hover on touch screens.

Do NOT require hover to understand the card.

On touch:

- card remains readable in default state;
- tapping navigates/activates the card;
- no required interaction depends on hidden text;
- no hover-only information may contain essential information.

If an expanded state is used on touch, use tap/focus semantics without creating accidental double-tap navigation.

---

# 15. MINEHUB CARD TYPES

Use the component for appropriate MineHub areas.

## 15.1 Capability cards

Use for the major MineHub capabilities:

```text
MineHub Report Studio
Deep-Dig RAG
Coal-Tuned Brain
Zero Guess
Transfer Superior Memory (MAG)
GeoMap
Agent Bench
Workflow Orchestration
```

Do not modify the locked product concepts.

---

# 16. CARD GRID

The supplied four-card reference demonstrates a clean horizontal enterprise grid.

Use:

```text
4 cards
```

only when the viewport provides enough width.

Desktop:

```text
[ CARD ][ CARD ][ CARD ][ CARD ]
```

Medium:

```text
[ CARD ][ CARD ][ CARD ]
[ CARD ]
```

or an equivalent balanced grid based on content width.

Tablet:

```text
[ CARD ][ CARD ]
```

Mobile:

```text
[ CARD ]
[ CARD ]
[ CARD ]
...
```

Never compress four cards into unreadable widths.

---

# 17. CARD GAP

Use consistent horizontal/vertical gaps.

Target:

```text
20px–28px
```

Avoid excessive whitespace.

Avoid cards touching each other.

The grid should visually align with the PRAGATI MITRA enterprise layout family.

---

# 18. STAGE CARD STYLE

The third supplied reference shows a different but related card treatment:

```text
white surface
thin colored top edge
compact uppercase stage label
large dark blue title
body text
soft shadow
```

This treatment can be used for:

- workflow stages;
- implementation stages;
- pipeline stages;
- process summaries;
- governed lifecycle steps.

Example:

```text
STAGE 01
SOURCE REGISTRATION

STAGE 02
DEEP-DIG RETRIEVAL

STAGE 03
EVIDENCE VALIDATION

STAGE 04
REPORT GENERATION
```

Only use actual MineHub workflow/content.

Do not invent stage information.

---

# 19. TOP ACCENT LINE

For stage cards use a thin top semantic accent.

Example:

```css
border-top: 4px solid #4caf50;
```

But choose semantic MineHub palette values.

Do not use random rainbow colors across cards.

The top line should remain thin.

---

# 20. CARD SHADOW

Use subtle enterprise elevation.

Example:

```css
box-shadow:
  0 4px 10px rgba(0,0,0,0.08);
```

For the supplied style family, keep shadows soft.

Do not combine:

- giant shadows;
- glow;
- heavy blur;
- 3D extrusion.

---

# 21. NEUMORPHISM

The MineHub card system may use **soft neumorphic depth** while preserving the supplied corner-reveal behavior.

Recommended:

```text
default card
↓
soft raised surface

interactive controls
↓
micro-raised

selected/focused
↓
subtle inset/outer depth
```

The neumorphism must remain secondary.

The corner-reveal interaction is the primary visual signature.

---

# 22. DO NOT OVER-NEUMORPHIZE

Do NOT turn the entire dashboard into:

```text
soft plastic buttons everywhere
```

Maintain white enterprise working surfaces for:

- tables;
- reports;
- source browsers;
- evidence;
- audit;
- forms.

Use the special cards selectively.

---

# 23. PRAGATI MITRA SHELL COMPATIBILITY

These cards must sit naturally inside the established PRAGATI MITRA-derived MineHub shell:

```text
dark institutional header
↓
pale-cyan context strip
↓
narrow enterprise navigation
↓
light page canvas
↓
white/light working surfaces
↓
special MineHub capability cards
```

Do not let the new cards change the shell into a different design language.

---

# 24. DASHBOARD USAGE

The cards should NOT cause the dashboard to become crowded again.

The previous requirement remains:

```text
REMOVE unnecessary dashboard content
```

Use only the minimum number of cards required.

Do not create:

- 8 huge capability cards;
- redundant KPI cards;
- duplicated feature panels;
- fake metrics.

For dashboard entry, a compact set of important MineHub capability/navigation cards is sufficient.

---

# 25. RECOMMENDED MINEHUB DASHBOARD CARD STRUCTURE

Use a compact capability row only where useful.

Example:

```text
┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│ Deep-Dig RAG     ↗ │ │ Zero Guess      ↗ │ │ Evidence Passport ↗│
│                    │ │                    │ │                    │
│ Evidence-backed    │ │ Validates claims   │ │ Trace every fact   │
│ retrieval...       │ │ before release...  │ │ back to source...  │
└────────────────────┘ └────────────────────┘ └────────────────────┘
```

The exact text must come from the approved MineHub product definition.

Do not add invented descriptions.

---

# 26. REPORT STUDIO USAGE

Capability cards may be used for:

```text
Report
Data Table
Timeline
Mind Map
Graph
Charts
```

But keep the same interaction family.

Do not turn every generated artifact into an oversized card.

---

# 27. EVIDENCE USAGE

Evidence-related navigation may use this card treatment for:

```text
Evidence Passport
Claims
Provenance
Conflict Court
Zero Guess
```

The card title must remain concise.

Evidence metadata belongs inside evidence screens, not inside decorative feature cards.

---

# 28. GEOMAP USAGE

GeoMap entry cards can use:

```text
GeoMap 2D
GeoMap 2.5D
GeoMap 3D
GeoMap VR
```

Only show modes that actually exist in the current implementation.

Do not imply that a future geometry capability is already available.

---

# 29. AGENT BENCH USAGE

Agent cards may use the same interaction language for:

```text
Reader Agent
Normalizer Agent
Linker Agent
Judge Agent
Writer Agent
Red-Team Agent
Guardian Agent
```

However, actual governed agent records must remain distinguishable from navigation cards.

Do not present a conceptual agent as an active deployed agent unless the backend confirms it.

---

# 30. WORKFLOW USAGE

Workflow cards can use:

```text
New workflow
My workflows
Draft
Published
Recent runs
Approval required
```

But do not fabricate counts.

---

# 31. RESPONSIVE CARD HEIGHT

Maintain consistent visual rhythm.

Desktop:

```text
compact fixed/min-height family
```

Mobile:

```text
content-driven height
```

Do not let one card become dramatically taller because of a long paragraph.

Use concise approved copy.

---

# 32. TEXT OVERFLOW

Do not allow titles to overflow.

Use:

```text
2-line maximum for most card titles
```

Descriptions should remain readable.

Do not use aggressive truncation that hides meaning.

For long titles:

```text
natural wrapping
```

not:

```text
...
```

unless the component is specifically designed for it.

---

# 33. FONTS

Use the same typography family already established in MineHub/PRAGATI MITRA.

Do not introduce another font family.

Maintain:

- strong semibold/bold heading;
- regular body;
- compact labels.

---

# 34. COLORS

Primary dark reveal:

```text
deep institutional navy
```

Default:

```text
pale cyan / blue
```

Text:

```text
dark charcoal/navy
```

Hover text:

```text
white / soft white
```

Use the existing MineHub design tokens if already established.

Do not hard-code conflicting colors across separate components.

---

# 35. GRADIENT RULE

The source card uses a mild gradient.

Keep the gradient extremely subtle.

Do not add:

- purple gradient;
- blue-to-purple AI SaaS gradient;
- rainbow;
- luminous gradient.

The card should still look like an institutional component.

---

# 36. MICRO-ANIMATION

Allowed:

- corner reveal;
- text color transition;
- subtle shadow transition;
- tiny arrow movement.

Not allowed:

- bounce;
- elastic expansion;
- 3D rotation;
- tilt;
- floating;
- particle effects;
- excessive scaling;
- page-wide animations.

---

# 37. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled:

- remove or greatly reduce the corner expansion animation;
- keep state changes understandable;
- maintain functional focus;
- preserve contrast.

The card must remain fully usable without motion.

---

# 38. IMPLEMENTATION STRUCTURE

Create a reusable component rather than duplicating CSS.

Recommended conceptual API:

```tsx
<MineHubFeatureCard
  title="..."
  description="..."
  href="..."
  eyebrow="..."
  variant="capability"
/>
```

Optional:

```tsx
<MineHubStageCard
  stage="01"
  title="..."
  description="..."
  accent="..."
/>
```

Use the existing project component conventions first.

Do not introduce an unnecessary new UI framework.

---

# 39. COMPONENT STATES

The card must support:

```text
DEFAULT
HOVER
FOCUS
FOCUS + HOVER
ACTIVE
DISABLED
LOADING
```

Do not create unnecessary visual states.

---

# 40. DISABLED STATE

Disabled cards should not use the hover reveal.

Use:

- muted text;
- reduced contrast while maintaining accessibility;
- no pointer affordance;
- no animated corner expansion.

---

# 41. LOADING STATE

Preserve card dimensions.

Use subtle skeleton loading.

Do not animate the corner reveal while loading.

Do not show fake completion percentage.

---

# 42. ACCESSIBILITY SEMANTICS

If card is a link:

```html
<a>
```

If card triggers an action:

```html
<button>
```

Do not use a clickable `div` unless there is a documented architectural reason and proper keyboard semantics are added.

Ensure:

- accessible name;
- focus;
- keyboard activation;
- sufficient target area;
- no color-only meaning.

---

# 43. CARD CONTENT RULE

Every card must answer:

```text
WHAT IS THIS?
```

and optionally:

```text
WHAT DOES IT DO?
```

Nothing more.

No marketing paragraphs.

No filler.

No fake numbers.

No redundant metadata.

---

# 44. MINEHUB NOVELTY

The innovation should come from applying this reference interaction to MineHub's evidence-first information architecture.

Example conceptual transformation:

```text
ordinary enterprise card
        ↓
interactive MineHub evidence/capability card
        ↓
hover reveal
        ↓
dark institutional evidence mode
        ↓
direct transition into the governed workspace
```

This creates a recognizable MineHub visual signature without violating the PRAGATI MITRA enterprise language.

---

# 45. DO NOT COPY PRAGATI MITRA CONTENT

Copy the:

```text
visual language
geometry
interaction pattern
spacing discipline
surface treatment
navigation relationship
```

Do NOT copy:

- PRAGATI MITRA text;
- PRAGATI MITRA numbers;
- PRAGATI MITRA logos;
- unrelated module names;
- unrelated data.

MineHub content must remain MineHub content.

---

# 46. DO NOT COPY THE SAMPLE "PRODUCT NAME"

The supplied images are a visual reference.

Never leave:

```text
Product Name
Lorem ipsum
```

in MineHub.

Replace with actual approved MineHub content.

---

# 47. VISUAL QA

After implementation, compare the component against the three supplied reference images.

Check:

```text
[ ] Card radius matches reference family
[ ] Default surface matches pale-blue reference
[ ] Corner starts small
[ ] Corner expands from top-right
[ ] Hover becomes dark navy
[ ] Title becomes white
[ ] Body becomes soft white
[ ] Arrow remains visible
[ ] Animation is smooth
[ ] Card remains compact
[ ] No excessive shadow
[ ] No glow
[ ] No glassmorphism
[ ] No extra content
[ ] Keyboard focus works
[ ] Reduced motion works
[ ] Mobile works
```

---

# 48. FINAL MINEHUB DESIGN TARGET

The final component should visually feel like:

```text
                 ↗
┌─────────────────────────────┐
│ MineHub Capability           │
│                              │
│ Concise evidence-first       │
│ description of the module.   │
│                              │
└─────────────────────────────┘

HOVER

                 ↗
┌─────────────────────────────┐
│ MINEHUB CAPABILITY           │
│                              │
│ Concise evidence-first       │
│ description of the module.   │
│                              │
└─────────────────────────────┘
      ↓
dark navy reveal
white typography
```

The essential visual identity is:

```text
PALE CYAN CARD
+
TOP-RIGHT CIRCULAR CORNER
+
NAVY REVEAL
+
WHITE HOVER TYPOGRAPHY
+
COMPACT ENTERPRISE GEOMETRY
+
SUBTLE DEPTH
```

---

# 49. ABSOLUTE RULES

DO NOT:

- replace the effect with a generic hover;
- remove the corner reveal;
- make cards giant;
- fill cards with unnecessary text;
- add fake statistics;
- add fake AI confidence;
- add fake metrics;
- add decorative icons everywhere;
- use neon;
- use glassmorphism;
- use cyberpunk styling;
- use giant gradients;
- use excessive animation;
- create separate CSS copies for every card;
- break the existing MineHub shell.

DO:

```text
Inspect references
↓
Inspect MineHub frontend
↓
Reuse existing design tokens/components
↓
Implement reusable card
↓
Apply MineHub content
↓
Add keyboard/touch/reduced-motion support
↓
Use selectively
↓
Remove unnecessary content
↓
Compare against references
↓
Correct visual drift
```

---

# 50. FINAL ACCEPTANCE

The task is complete only when the MineHub card component:

1. looks like the supplied reference card family;
2. uses the corner-reveal interaction;
3. transitions from pale cyan to dark navy;
4. preserves readable typography;
5. works with keyboard and touch;
6. respects reduced motion;
7. uses actual MineHub content;
8. does not add unwanted content;
9. works responsively;
10. integrates naturally with the PRAGATI MITRA-inspired MineHub shell;
11. remains reusable across MineHub capability, workflow and module surfaces;
12. does not compromise the evidence-first product architecture.
