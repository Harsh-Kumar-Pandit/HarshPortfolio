import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ── 440×500 coordinate space (portrait ratio — keeps face dominant) ─────────
// All paths: identical M + 4×C + Z structure for smooth interpolation
const BLOBS = [
  "M220,40 C316,40 398,118 396,248 C394,378 314,458 220,456 C126,454 44,376 42,248 C40,120 124,40 220,40 Z",
  "M232,32 C330,50 406,134 394,262 C382,390 302,460 214,452 C126,444 40,366 44,240 C48,114 134,14 232,32 Z",
  "M210,46 C308,28 400,112 392,244 C384,376 306,466 214,456 C122,446 36,370 42,246 C48,122 112,64 210,46 Z",
  "M228,34 C324,46 404,128 392,258 C380,388 300,460 210,450 C120,440 38,362 44,240 C50,118 132,22 228,34 Z",
  "M220,40 C316,40 398,118 396,248 C394,378 314,458 220,456 C126,454 44,376 42,248 C40,120 124,40 220,40 Z",
];

// Matching CSS @keyframes — same coords (440×500 pixel space)
const CSS = `
  @keyframes hbClip {
    0%,100%{ clip-path:path('M220,40 C316,40 398,118 396,248 C394,378 314,458 220,456 C126,454 44,376 42,248 C40,120 124,40 220,40 Z'); }
    25%    { clip-path:path('M232,32 C330,50 406,134 394,262 C382,390 302,460 214,452 C126,444 40,366 44,240 C48,114 134,14 232,32 Z'); }
    50%    { clip-path:path('M210,46 C308,28 400,112 392,244 C384,376 306,466 214,456 C122,446 36,370 42,246 C48,122 112,64 210,46 Z'); }
    75%    { clip-path:path('M228,34 C324,46 404,128 392,258 C380,388 300,460 210,450 C120,440 38,362 44,240 C50,118 132,22 228,34 Z'); }
  }
  .hb-mask {
    width: 440px;
    height: 500px;
    animation: hbClip 11s ease-in-out infinite;
    position: relative;
  }
  .hb-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;   /* face-first crop */
    display: block;
    transform-origin: top center;
    transform: scale(1.05) translateY(25px); /* Perfectly aligns the head within the mask */
  }
  .hb-unit { transform-origin: center center; }
  @media(max-width:1024px){ .hb-unit{ transform:scale(0.8);  } }
  @media(max-width:640px) { .hb-unit{ transform:scale(0.62); } }
`;

const TRANS = { duration: 11, repeat: Infinity, ease: 'easeInOut' };

export default function HeroPortrait() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-250,250],[ 6,-6]), { stiffness:80, damping:18 });
  const ry = useSpring(useTransform(mx, [-250,250],[-6, 6]), { stiffness:80, damping:18 });

  const onMove = e => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width  / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  };

  return (
    <>
      <style>{CSS}</style>

      <motion.div
        ref={ref}
        className="hb-unit"
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ scale: 1.03 }}
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position:'relative', display:'inline-block',
                 perspective:900, rotateX:rx, rotateY:ry }}
      >
        {/* ── Ambient atmospheric glow ─────────────────────── */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.75, scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position:'absolute', inset:'-28%',
            background:'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,.42) 0%, rgba(99,102,241,.18) 42%, transparent 68%)',
            filter:'blur(46px)', pointerEvents:'none', zIndex:0,
          }}
        />

        {/* ── 4-layer thick neon blob frame (behind photo) ─── */}
        <svg viewBox="0 0 440 500" aria-hidden
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                   overflow:'visible', pointerEvents:'none', zIndex:1 }}>
          <defs>
            <linearGradient id="ng2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="var(--blob-glow-color-1)"/>
              <stop offset="28%"  stopColor="var(--blob-glow-color-2)"/>
              <stop offset="60%"  stopColor="var(--blob-glow-color-3)"/>
              <stop offset="100%" stopColor="var(--blob-glow-color-4)"/>
            </linearGradient>
            <filter id="fb2" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="30"/>
            </filter>
            <filter id="fm2" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="14"/>
            </filter>
            <filter id="fn2" x="-18%" y="-18%" width="136%" height="136%">
              <feGaussianBlur stdDeviation="6"/>
            </filter>
            <filter id="fe2" x="-8%"  y="-8%"  width="116%" height="116%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Layer 1: wide outer bloom */}
          <motion.path fill="none" stroke="url(#ng2)" strokeWidth="120"
            style={{ opacity: hovered ? `calc(var(--blob-glow-opacity-bloom) + 0.08)` : `var(--blob-glow-opacity-bloom)` }}
            animate={{ d: BLOBS }}
            transition={TRANS} filter="url(#fb2)"/>

          {/* Layer 2: mid glow body */}
          <motion.path fill="none" stroke="url(#ng2)" strokeWidth="78"
            style={{ opacity: hovered ? `calc(var(--blob-glow-opacity-mid) + 0.13)` : `var(--blob-glow-opacity-mid)` }}
            animate={{ d: BLOBS }}
            transition={TRANS} filter="url(#fm2)"/>

          {/* Layer 3: thick main border */}
          <motion.path fill="none" stroke="url(#ng2)" strokeWidth="44"
            style={{ opacity: hovered ? `calc(var(--blob-glow-opacity-body) + 0.14)` : `var(--blob-glow-opacity-body)` }}
            animate={{ d: BLOBS }}
            transition={TRANS} filter="url(#fn2)"/>

          {/* Layer 4: hot crisp neon edge */}
          <motion.path fill="none" stroke="url(#ng2)" strokeWidth="4.5"
            style={{ opacity: `var(--blob-glow-opacity-edge)` }}
            animate={{ d: BLOBS }}
            transition={TRANS} filter="url(#fe2)"/>

          {/* Shimmer highlight — rotating bright arc */}
          <motion.path fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2"
            strokeDasharray="60 999"
            animate={{ d: BLOBS, strokeDashoffset: [0, -900] }}
            transition={{ ...TRANS, duration: 6 }} filter="url(#fe2)"/>
        </svg>

        {/* ── Portrait (morphing clip-path mask) ───────────── */}
        <div className="hb-mask" style={{ position:'relative', zIndex:2 }}>
          <img
            className="hb-img"
            src="/assets/images/HarshPanditHero.png"
            alt="Harsh Kumar Pandit"
            draggable={false}
          />
        </div>

        {/* ── Inner depth shadow overlay ────────────────────── */}
        <svg viewBox="0 0 440 500" aria-hidden
          style={{ position:'absolute', inset:0, width:'100%', height:'100%',
                   overflow:'visible', pointerEvents:'none', zIndex:3 }}>
          <defs>
            <radialGradient id="depthSh" cx="50%" cy="90%" r="70%">
              <stop offset="0%"   stopColor="rgba(0,0,0,0.5)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
            <clipPath id="depthClip">
              <motion.path animate={{ d: BLOBS }} transition={TRANS}/>
            </clipPath>
          </defs>
          <ellipse cx="220" cy="430" rx="170" ry="70"
            fill="url(#depthSh)" clipPath="url(#depthClip)" opacity={0.55}/>
        </svg>
      </motion.div>
    </>
  );
}
