# Manikanta Korimilli · Portfolio

Live at https://manikorimilli.vercel.app

Personal portfolio built with React 19, TypeScript and Vite. Motion by GSAP
(ScrollTrigger, SplitText) and Lenis.

## Commands

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
npm run lint
```

## Content

`public/resume.pdf` is the source of truth. All copy lives in
`src/lib/content.ts`; update both together.

## Performance and accessibility

- `prefers-reduced-motion` disables smooth scrolling, the intro, scrubbed
  reveals and the custom cursor.
- Skip link, landmarks, labelled sections, keyboard-reachable controls and
  visible focus rings throughout.
