# Workspace Animation & UX Rules

## Premium Healthcare Animation Guidelines

- **Professional & Purposeful Motion**: Add premium, smooth, modern animations throughout the website, keeping them professional and suitable for a nursing/healthcare college website. The animations must make the site feel polished and interactive, never flashy or distracting.
- **Framer Motion Setup**: Use **Framer Motion** for page and component animations. Add smooth section reveal animations when content enters the viewport, with subtle fade-up, slide-up, and staggered child animations. Use `viewport={{ once: true }}` so animations do not repeat unnecessarily while scrolling.
- **Refined Hero Sequence**: Category badge fades in first, followed by main heading, description, metadata, CTA buttons, and finally hero image. Hero images use subtle scale-in from `0.96` to `1` with soft easing.
- **Parallax Scroll Effects**: Gentle parallax effect for major campus and clinical-training images while scrolling. Keep movement small and smooth.
- **Card Micro-Interactions**: For program cards, college cards, and facility cards: image zoom around `1.03–1.05`, card lift by around `-8px`, slight border/shadow enhancement, and animate the arrow icon slightly to the right (`translate-x-1.5`). Avoid large bouncing effects.
- **Staggered Card Grids**: Staggered reveal animations for card grids so cards appear sequentially instead of all at once (delay `0.08–0.12s`).
- **Overflow Image Reveals**: Image-reveal animations using overflow-hidden containers where images slide or scale into view as sections appear (`scale: 1.08 → 1`).
- **Navigation & Links**: Animated underline or active-state transitions for sticky navigation links. Smooth scrolling for internal anchor navigation.
- **Button Micro-Interactions**: Subtle scale change on hover/tap (`scale-[1.02]`, `scale-[0.98]`), animated arrow movement, and soft background transition. Avoid exaggerated glow effects.
- **Animated Statistics Counter**: Elegant animated counter effect for numerical statistics (Programs, Labs, Clinical Rotations, Campuses) when entering viewport.
- **Campus Gallery**: Smooth hover zoom, dark overlay fade, caption reveal from bottom, and animated modal lightbox opening/closing.
- **Page Route Transitions**: Short fade + upward motion (`y: 12` to `0`, `duration: 0.35s`) for route changes.
- **Scroll Progress Indicator**: Premium orange brand scroll progress bar (`#F26A21`) at top of header.
- **Admissions Open CTA Sequence**: Soft reveal animation for Admissions CTA sections, entering in sequence.
- **Reduced Motion Support**: Respect `prefers-reduced-motion` and disable non-essential motion when requested by OS settings.
- **Performance & Easing**: Animate only `transform` and `opacity`. Use low-bounce spring (`stiffness: 120`, `damping: 16`) or cubic-bezier `[0.22, 1, 0.36, 1]` with durations between `0.55s–0.75s`.

---

## High-Impact Cinematic Motion & Soft Pop-Up Architecture

- **Reusable Animation Variants**: Do NOT add generic `whileInView={{ opacity: 1, y: 0 }}` inline everywhere. Build and use coordinated reusable variants (`motionVariants.ts`):
  - **Headings & Badges Soft Pop**: Entrance starting at `scale: 0.96`, `opacity: 0`, `y: 20px` settling smoothly into place.
  - **Card Soft Pop-Up**: Cards enter from `opacity: 0`, `scale: 0.90–0.94`, `y: 30–45px` to `opacity: 1`, `scale: 1`, `y: 0` with low-bounce spring (`stiffness: 120`, `damping: 16`).
  - **Featured Card Overshoot Pop**: Featured cards enter with subtle overshoot (`scale: 1.02 → 1`) to create a polished emphasis effect.
  - **Staggered Card Grid Waves**: Staggered pop-up wave delays (`0.08–0.12s`) across program, facility, college, activity, seminar, and statistics cards.
  - **Large Image Soft Scale Reveal**: Large photos use soft scale reveal (`scale: 1.05 → 1`, `opacity: 0 → 1`) instead of card pop-up animations.
  - **Hover Micro-Interactions**: Post-pop hover lift `translateY(-6px)` and `scale(1.015)` for a seamless transition into interactive state.
- **Viewport Trigger Config**: Use `viewport={{ once: true, amount: 0.2 }}` across all pop-up triggers.
- **Mobile Performance Guarantee**: Animate strictly `transform` and `opacity` to avoid layout reflows, ensuring 60fps performance across mobile devices.
