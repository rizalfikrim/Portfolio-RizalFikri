"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import Lanyard from "../ui/Lanyard";

const TITLES = [
  "Backend Developer",
  "API Architect",
  "System Engineer",
  "Problem Solver",
];

/* ── Smooth lerp helper ── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ── AI Robot SVG Component ── */
function AIRobot({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  // Convert mouse position (-1 to 1) into subtle rotation/translate
  const headTiltX = mouseX * 12; // degrees
  const headTiltY = mouseY * 8;
  const bodyTiltX = mouseX * 4;
  const bodyTiltY = mouseY * 3;
  const eyeOffX = mouseX * 4; // px eye tracking
  const eyeOffY = mouseY * 3;
  const antennaX = mouseX * 6;
  const antennaY = mouseY * 4;

  return (
    <svg
      viewBox="0 0 340 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        filter: "drop-shadow(0 0 40px rgba(0,212,255,0.25))",
      }}
    >
      <defs>
        {/* Body gradient */}
        <radialGradient id="bodyGrad" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e8eef8" />
          <stop offset="100%" stopColor="#c8d4e8" />
        </radialGradient>
        {/* Head gradient */}
        <radialGradient id="headGrad" cx="38%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#f8faff" />
          <stop offset="55%" stopColor="#e2ecf8" />
          <stop offset="100%" stopColor="#bfcfe4" />
        </radialGradient>
        {/* Visor gradient */}
        <radialGradient id="visorGrad" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#0a0a18" />
          <stop offset="100%" stopColor="#020210" />
        </radialGradient>
        {/* Cyan glow */}
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffea" stopOpacity="1" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0080ff" stopOpacity="0.4" />
        </radialGradient>
        {/* Cyan eye core */}
        <radialGradient id="eyeCore" cx="40%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#aaffee" />
          <stop offset="100%" stopColor="#00c8ff" />
        </radialGradient>
        {/* Ring gradient */}
        <radialGradient id="ringGrad" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#6090ff" />
          <stop offset="100%" stopColor="#2244cc" />
        </radialGradient>
        {/* Arm gradient */}
        <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8eef8" />
          <stop offset="100%" stopColor="#bfcfe4" />
        </linearGradient>

        {/* Filter: soft glow for eyes */}
        <filter id="eyeBloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Filter: ambient glow on body */}
        <filter id="bodyGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Antenna tip glow */}
        <filter id="tipGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Smile glow */}
        <filter id="smileGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>{`
          .robot-float {
            animation: robotFloat 3.6s ease-in-out infinite;
            transform-origin: 170px 300px;
          }
          @keyframes robotFloat {
            0%,100% { transform: translateY(0px); }
            50%      { transform: translateY(-14px); }
          }
          .antenna-pulse {
            animation: antennaPulse 2s ease-in-out infinite;
          }
          @keyframes antennaPulse {
            0%,100% { opacity:1; r:7; }
            50%      { opacity:0.6; r:9; }
          }
          .ring-spin {
            animation: ringRotate 8s linear infinite;
            transform-origin: 170px 370px;
          }
          @keyframes ringRotate {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          .ring-spin-rev {
            animation: ringRotateRev 6s linear infinite;
            transform-origin: 170px 370px;
          }
          @keyframes ringRotateRev {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          .chest-blink {
            animation: chestBlink 3s ease-in-out infinite;
          }
          @keyframes chestBlink {
            0%,85%,100% { opacity:1; }
            88%          { opacity:0.2; }
            92%          { opacity:1; }
            95%          { opacity:0.3; }
          }
          .eye-blink {
            animation: eyeBlink 4s ease-in-out infinite;
            transform-origin: center;
          }
          @keyframes eyeBlink {
            0%,90%,100% { scaleY: 1; }
            93% { transform: scaleY(0.08); }
          }
        `}</style>
      </defs>

      {/* ── Shadow under robot ── */}
      <ellipse cx="170" cy="462" rx="70" ry="10" fill="rgba(0,0,0,0.18)" />

      {/* ════ WHOLE ROBOT — floats up/down ════ */}
      <g className="robot-float">
        {/* ── Orbit ring behind ── */}
        <g className="ring-spin">
          <ellipse
            cx="170"
            cy="370"
            rx="100"
            ry="28"
            fill="none"
            stroke="#2244cc"
            strokeWidth="3"
            strokeOpacity="0.35"
            strokeDasharray="12 8"
          />
        </g>

        {/* ── LEFT ARM ── */}
        <g
          style={{
            transition: "transform 0.2s ease",
            transformOrigin: "90px 310px",
            transform: `rotate(${bodyTiltX * 0.5}deg) translateY(${bodyTiltY * 0.5}px)`,
          }}
        >
          {/* Upper arm */}
          <rect
            x="52"
            y="280"
            width="46"
            height="80"
            rx="23"
            fill="url(#armGrad)"
          />
          {/* Blue ring accent */}
          <ellipse
            cx="75"
            cy="330"
            rx="18"
            ry="10"
            fill="none"
            stroke="#2244cc"
            strokeWidth="4"
            strokeOpacity="0.7"
          />
          {/* Hand */}
          <circle cx="75" cy="360" r="20" fill="url(#armGrad)" />
        </g>

        {/* ── RIGHT ARM ── */}
        <g
          style={{
            transition: "transform 0.2s ease",
            transformOrigin: "250px 310px",
            transform: `rotate(${-bodyTiltX * 0.5}deg) translateY(${bodyTiltY * 0.5}px)`,
          }}
        >
          {/* Upper arm */}
          <rect
            x="242"
            y="280"
            width="46"
            height="80"
            rx="23"
            fill="url(#armGrad)"
          />
          {/* Blue ring accent */}
          <ellipse
            cx="265"
            cy="330"
            rx="18"
            ry="10"
            fill="none"
            stroke="#2244cc"
            strokeWidth="4"
            strokeOpacity="0.7"
          />
          {/* Hand */}
          <circle cx="265" cy="360" r="20" fill="url(#armGrad)" />
        </g>

        {/* ── BODY ── */}
        <g
          style={{
            transition: "transform 0.18s ease",
            transformOrigin: "170px 340px",
            transform: `rotate(${bodyTiltX}deg) translateY(${bodyTiltY}px)`,
          }}
        >
          {/* Body main shape */}
          <rect
            x="88"
            y="265"
            width="164"
            height="160"
            rx="50"
            fill="url(#bodyGrad)"
          />

          {/* Chest panel - dark inset */}
          <rect
            x="118"
            y="295"
            width="104"
            height="90"
            rx="18"
            fill="#0e1428"
            fillOpacity="0.85"
          />

          {/* Chest glowing screen lines */}
          <rect
            x="128"
            y="308"
            width="84"
            height="4"
            rx="2"
            fill="#00d4ff"
            fillOpacity="0.5"
          />
          <rect
            x="128"
            y="320"
            width="60"
            height="4"
            rx="2"
            fill="#00d4ff"
            fillOpacity="0.35"
          />
          <rect
            x="128"
            y="332"
            width="72"
            height="4"
            rx="2"
            fill="#00d4ff"
            fillOpacity="0.25"
          />

          {/* Chest center glowing orb */}
          <circle cx="170" cy="355" r="16" fill="#0a1028" />
          <circle
            cx="170"
            cy="355"
            r="11"
            fill="url(#eyeGlow)"
            filter="url(#eyeBloom)"
            className="chest-blink"
          />
          <circle cx="170" cy="355" r="6" fill="#aaffee" />

          {/* Body ring accent (left) */}
          <circle
            cx="108"
            cy="340"
            r="14"
            fill="none"
            stroke="#2244cc"
            strokeWidth="5"
          />
          <circle cx="108" cy="340" r="6" fill="#2244cc" fillOpacity="0.6" />

          {/* Body ring accent (right) */}
          <circle
            cx="232"
            cy="340"
            r="14"
            fill="none"
            stroke="#2244cc"
            strokeWidth="5"
          />
          <circle cx="232" cy="340" r="6" fill="#2244cc" fillOpacity="0.6" />

          {/* Belt / waist line */}
          <rect
            x="88"
            y="405"
            width="164"
            height="14"
            rx="7"
            fill="#bfcfe4"
            fillOpacity="0.5"
          />
        </g>

        {/* ── HEAD GROUP — follows cursor ── */}
        <g
          style={{
            transition: "transform 0.15s ease",
            transformOrigin: "170px 200px",
            transform: `rotate(${headTiltX}deg) translateY(${headTiltY}px)`,
          }}
        >
          {/* Neck */}
          <rect x="148" y="242" width="44" height="32" rx="10" fill="#d0dcf0" />
          <rect
            x="155"
            y="248"
            width="30"
            height="8"
            rx="4"
            fill="#bfcfe4"
            fillOpacity="0.6"
          />

          {/* Antenna stem */}
          <g
            style={{
              transition: "transform 0.12s ease",
              transformOrigin: "170px 100px",
              transform: `rotate(${antennaX}deg) translateY(${antennaY * 0.5}px)`,
            }}
          >
            <rect x="167" y="82" width="6" height="62" rx="3" fill="#d0dcf0" />
            {/* Antenna ear fins */}
            <rect
              x="154"
              y="108"
              width="16"
              height="6"
              rx="3"
              fill="#5577cc"
              fillOpacity="0.7"
              transform="rotate(-15 162 111)"
            />
            <rect
              x="170"
              y="108"
              width="16"
              height="6"
              rx="3"
              fill="#5577cc"
              fillOpacity="0.7"
              transform="rotate(15 178 111)"
            />
            {/* Antenna tip glow */}
            <circle
              cx="170"
              cy="80"
              r="10"
              fill="url(#eyeGlow)"
              filter="url(#tipGlow)"
              className="antenna-pulse"
            />
            <circle cx="170" cy="80" r="5" fill="#aaffee" />
          </g>

          {/* Head main shape */}
          <rect
            x="90"
            y="130"
            width="160"
            height="130"
            rx="42"
            fill="url(#headGrad)"
          />

          {/* Head subtle rim highlight */}
          <rect
            x="90"
            y="130"
            width="160"
            height="60"
            rx="42"
            fill="white"
            fillOpacity="0.12"
          />

          {/* Visor / face screen */}
          <rect
            x="108"
            y="152"
            width="124"
            height="84"
            rx="26"
            fill="url(#visorGrad)"
          />
          {/* Visor inner gloss */}
          <rect
            x="112"
            y="155"
            width="116"
            height="30"
            rx="20"
            fill="white"
            fillOpacity="0.05"
          />

          {/* ── LEFT EYE ── */}
          <g
            filter="url(#eyeBloom)"
            className="eye-blink"
            style={{ transformOrigin: `${143 + eyeOffX}px ${192 + eyeOffY}px` }}
          >
            <circle
              cx={143 + eyeOffX}
              cy={192 + eyeOffY}
              r="20"
              fill="url(#eyeGlow)"
            />
            <circle
              cx={143 + eyeOffX}
              cy={192 + eyeOffY}
              r="14"
              fill="url(#eyeCore)"
            />
            <circle
              cx={143 + eyeOffX}
              cy={192 + eyeOffY}
              r="8"
              fill="#ffffff"
              fillOpacity="0.9"
            />
            {/* Eye glint */}
            <circle
              cx={140 + eyeOffX}
              cy={188 + eyeOffY}
              r="3"
              fill="white"
              fillOpacity="0.8"
            />
          </g>

          {/* ── RIGHT EYE ── */}
          <g
            filter="url(#eyeBloom)"
            className="eye-blink"
            style={{ transformOrigin: `${197 + eyeOffX}px ${192 + eyeOffY}px` }}
          >
            <circle
              cx={197 + eyeOffX}
              cy={192 + eyeOffY}
              r="20"
              fill="url(#eyeGlow)"
            />
            <circle
              cx={197 + eyeOffX}
              cy={192 + eyeOffY}
              r="14"
              fill="url(#eyeCore)"
            />
            <circle
              cx={197 + eyeOffX}
              cy={192 + eyeOffY}
              r="8"
              fill="#ffffff"
              fillOpacity="0.9"
            />
            {/* Eye glint */}
            <circle
              cx={194 + eyeOffX}
              cy={188 + eyeOffY}
              r="3"
              fill="white"
              fillOpacity="0.8"
            />
          </g>

          {/* ── SMILE ── */}
          <path
            d={`M ${150 + eyeOffX * 0.3} ${222 + eyeOffY * 0.3} Q ${170 + eyeOffX * 0.3} ${238 + eyeOffY * 0.3} ${190 + eyeOffX * 0.3} ${222 + eyeOffY * 0.3}`}
            fill="none"
            stroke="#00ffcc"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#smileGlow)"
            opacity="0.9"
          />

          {/* Ear left */}
          <rect
            x="76"
            y="162"
            width="22"
            height="50"
            rx="11"
            fill="url(#headGrad)"
          />
          <rect
            x="80"
            y="175"
            width="14"
            height="26"
            rx="7"
            fill="#2244cc"
            fillOpacity="0.5"
          />

          {/* Ear right */}
          <rect
            x="242"
            y="162"
            width="22"
            height="50"
            rx="11"
            fill="url(#headGrad)"
          />
          <rect
            x="246"
            y="175"
            width="14"
            height="26"
            rx="7"
            fill="#2244cc"
            fillOpacity="0.5"
          />
        </g>

        {/* ── Orbit ring front ── */}
        <g className="ring-spin-rev">
          <ellipse
            cx="170"
            cy="370"
            rx="80"
            ry="22"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            strokeOpacity="0.25"
            strokeDasharray="8 14"
          />
        </g>
      </g>
      {/* end robot-float */}
    </svg>
  );
}

/* ────────────────────────────────────────────
   Hero Component
──────────────────────────────────────────── */
export default function Hero() {
  const { t } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Smoothed mouse position: -1 to 1 relative to viewport center
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Lerp mouse for buttery smooth tracking
  const tick = useCallback(() => {
    setMouse((prev) => {
      const nx = lerp(prev.x, targetMouse.current.x, 0.08);
      const ny = lerp(prev.y, targetMouse.current.y, 0.08);
      return { x: nx, y: ny };
    });
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ─── Typewriter ───
  useEffect(() => {
    const current = TITLES[titleIndex];
    if (!isDeleting) {
      if (charIndex < current.length) {
        const t = setTimeout(() => setCharIndex((c) => c + 1), 78);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), 42);
      return () => clearTimeout(t);
    }
    setIsDeleting(false);
    setTitleIndex((i) => (i + 1) % TITLES.length);
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    setDisplayed(TITLES[titleIndex].slice(0, charIndex));
  }, [charIndex, titleIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rfm-hero {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 90% 90% at 65% 35%, rgba(124,58,237,0.22) 0%, transparent 58%),
            radial-gradient(ellipse 70% 70% at 25% 75%, rgba(0,180,216,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 50% -5%, rgba(99,40,200,0.3) 0%, transparent 45%),
            radial-gradient(ellipse 40% 40% at 80% 90%, rgba(236,72,153,0.08) 0%, transparent 50%),
            #020210;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
        }

        .rfm-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
          background-size: 66px 66px;
          animation: rfm-gridDrift 25s linear infinite;
        }
        @keyframes rfm-gridDrift {
          from { background-position: 0 0; }
          to   { background-position: 66px 66px; }
        }

        .rfm-blob1 {
          position: absolute; pointer-events: none; z-index: 0;
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%);
          top: -200px; right: -80px;
          animation: rfm-blobPulse 8s ease-in-out infinite;
        }
        .rfm-blob2 {
          position: absolute; pointer-events: none; z-index: 0;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%);
          bottom: -80px; left: 80px;
          animation: rfm-blobPulse 10s ease-in-out 2s infinite;
        }
        @keyframes rfm-blobPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.08); opacity: 0.75; }
        }

        .rfm-inner {
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
          width: 100%; position: relative; z-index: 10;
        }

        .rfm-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 4vw, 60px);
          align-items: center;
          min-height: 100vh;
          padding: 90px 0 80px;
        }

        /* ── LEFT COLUMN ── */
        .rfm-left { display: flex; flex-direction: column; gap: 26px; }

        .rfm-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px;
          padding: 8px 20px; width: fit-content;
          opacity: 0;
          animation: rfm-up 0.7s ease 0.15s forwards;
        }
        .rfm-dot {
          width: 9px; height: 9px;
          background: #4ade80;
          border-radius: 50%; flex-shrink: 0;
          animation: rfm-dotPulse 2s infinite;
          box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
        }
        @keyframes rfm-dotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          70%  { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }

        .rfm-greeting {
          color: rgba(255,255,255,0.38);
          font-size: 15px; letter-spacing: 4px; text-transform: uppercase;
          opacity: 0; animation: rfm-up 0.7s ease 0.25s forwards;
        }

        .rfm-nameWrap {
          opacity: 0; animation: rfm-up 0.8s ease 0.38s forwards;
          line-height: 1.0;
        }
        .rfm-nameTop, .rfm-nameBot {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          font-size: clamp(40px, 5.2vw, 74px);
          letter-spacing: -0.01em;
          display: block;
        }
        .rfm-nameTop { color: #dde8f8; }
        .rfm-nameBot {
          background: linear-gradient(130deg, #00d4ff 0%, #818cf8 48%, #e879f9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rfm-twWrap {
          display: flex; align-items: center; min-height: 46px;
          opacity: 0; animation: rfm-up 0.7s ease 0.52s forwards;
        }
        .rfm-twText {
          font-family: 'Rajdhani', sans-serif;
          font-size: clamp(19px, 2vw, 27px);
          font-weight: 600; color: rgba(255,255,255,0.78); letter-spacing: 0.5px;
        }
        .rfm-cursor {
          display: inline-block; width: 3px; height: 1.1em;
          background: #00d4ff; margin-left: 4px;
          vertical-align: text-bottom;
          animation: rfm-blink 1s step-end infinite;
        }
        @keyframes rfm-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .rfm-bio {
          color: rgba(255,255,255,0.4);
          line-height: 1.9; font-size: 15.5px; max-width: 475px;
          opacity: 0; animation: rfm-up 0.7s ease 0.65s forwards;
        }

        .rfm-stats {
          display: flex; gap: 16px;
          opacity: 0; animation: rfm-up 0.7s ease 0.78s forwards;
        }
        .rfm-stat {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.13);
          border-radius: 14px; padding: 15px 10px; text-align: center;
          transition: border-color 0.3s, background 0.3s;
        }
        .rfm-stat:hover {
          border-color: rgba(0,212,255,0.35);
          background: rgba(0,212,255,0.05);
        }
        .rfm-statNum {
          font-family: 'Orbitron', monospace;
          font-size: 22px; font-weight: 700; color: #00d4ff;
        }
        .rfm-statLabel { font-size: 11px; color: rgba(255,255,255,0.32); margin-top: 4px; }

        .rfm-ctas {
          display: flex; gap: 14px; flex-wrap: wrap;
          opacity: 0; animation: rfm-up 0.7s ease 0.9s forwards;
        }
        .rfm-btnPrimary {
          padding: 14px 30px;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          border: none; border-radius: 9px; color: #03001a;
          font-family: 'Orbitron', monospace;
          font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: transform 0.22s, box-shadow 0.3s;
        }
        .rfm-btnPrimary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent 60%);
          opacity: 0; transition: opacity 0.22s;
        }
        .rfm-btnPrimary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(0,212,255,0.38), 0 4px 16px rgba(124,58,237,0.35);
        }
        .rfm-btnPrimary:hover::after { opacity: 1; }

        .rfm-btnOutline {
          padding: 14px 30px;
          background: transparent;
          border: 1px solid rgba(0,212,255,0.32); border-radius: 9px;
          color: #00d4ff;
          font-family: 'Orbitron', monospace;
          font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
          cursor: pointer; transition: all 0.25s;
        }
        .rfm-btnOutline:hover {
          background: rgba(0,212,255,0.08);
          border-color: #00d4ff;
          box-shadow: 0 0 24px rgba(0,212,255,0.22);
          transform: translateY(-3px);
        }

        .rfm-socials {
          display: flex; gap: 10px;
          opacity: 0; animation: rfm-up 0.7s ease 1.05s forwards;
        }
        .rfm-soc {
          width: 45px; height: 45px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; color: rgba(255,255,255,0.42);
          transition: all 0.22s; cursor: pointer;
        }
        .rfm-soc:hover {
          background: rgba(0,212,255,0.1);
          border-color: rgba(0,212,255,0.42);
          color: #00d4ff;
          transform: translateY(-4px);
          box-shadow: 0 8px 22px rgba(0,212,255,0.18);
        }

        /* ── RIGHT COLUMN — Robot ── */
        .rfm-robot-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 82vh; min-height: 520px;
          position: relative;
          opacity: 0;
          animation: rfm-fadeIn 1.4s ease 0.6s forwards;
        }

        .rfm-robot-inner {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ambient glow ring behind robot */
        .rfm-robot-glow {
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(0,212,255,0.18) 0%,
            rgba(124,58,237,0.12) 40%,
            transparent 70%
          );
          top: 50%; left: 50%;
          transform: translate(-50%, -55%);
          animation: rfm-glowPulse 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes rfm-glowPulse {
          0%,100% { opacity: 0.7; transform: translate(-50%, -55%) scale(1); }
          50%      { opacity: 1; transform: translate(-50%, -55%) scale(1.12); }
        }

        /* Floating particles around robot */
        .rfm-particle {
          position: absolute;
          border-radius: 50%;
          background: #00d4ff;
          pointer-events: none;
        }
        .rfm-p1 { width: 5px; height: 5px; top: 18%; left: 8%;
          animation: rfm-orbit1 5s ease-in-out infinite; }
        .rfm-p2 { width: 4px; height: 4px; top: 25%; right: 10%;
          animation: rfm-orbit1 7s ease-in-out 1s infinite; opacity: 0.6; }
        .rfm-p3 { width: 6px; height: 6px; bottom: 28%; left: 12%;
          animation: rfm-orbit1 6s ease-in-out 2s infinite; opacity: 0.8; }
        .rfm-p4 { width: 3px; height: 3px; bottom: 22%; right: 8%;
          animation: rfm-orbit1 4.5s ease-in-out 0.5s infinite; opacity: 0.5; }
        @keyframes rfm-orbit1 {
          0%,100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50%      { transform: translateY(-18px) scale(1.3); opacity: 1; }
        }

        /* Data flow lines */
        .rfm-dataline {
          position: absolute;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(0,212,255,0.5), transparent);
          pointer-events: none;
          animation: rfm-dataFlow 3s ease-in-out infinite;
        }
        .rfm-dl1 { height: 80px; left: 5%; top: 30%;
          animation-delay: 0s; }
        .rfm-dl2 { height: 60px; right: 6%; top: 40%;
          animation-delay: 1.2s; }
        @keyframes rfm-dataFlow {
          0%,100% { opacity: 0; transform: translateY(-10px); }
          50%      { opacity: 1; transform: translateY(10px); }
        }

        /* Scroll indicator */
        .rfm-scroll {
          position: absolute; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 7px;
          color: rgba(255,255,255,0.2);
          font-family: 'Orbitron', monospace;
          font-size: 9px; letter-spacing: 4px;
          cursor: pointer; z-index: 20;
          opacity: 0; animation: rfm-fadeIn 1.2s ease 2.2s forwards;
          transition: color 0.2s; background: none; border: none;
        }
        .rfm-scroll:hover { color: #00d4ff; }
        .rfm-chev { animation: rfm-chev 2s ease-in-out infinite; }
        @keyframes rfm-chev {
          0%,100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }

        @keyframes rfm-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rfm-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .rfm-layout {
            grid-template-columns: 1fr !important;
            padding-top: 100px !important;
            gap: 0 !important;
          }
          .rfm-robot-wrap {
            height: 64vw !important;
            min-height: 280px !important;
            order: -1;
          }
          .rfm-robot-inner { max-width: 300px; }
          .rfm-p1, .rfm-p2, .rfm-p3, .rfm-p4, .rfm-dl1, .rfm-dl2 { display: none; }
        }
      `}</style>

      <section id="home" className="rfm-hero">
        <div className="rfm-grid" />
        <div className="rfm-blob1" />
        <div className="rfm-blob2" />

        <div className="rfm-inner">
          <div className="rfm-layout">
            {/* ─── LEFT ─── */}
            <div className="rfm-left">
              <div className="rfm-badge">
                <div className="rfm-dot" />
                <span
                  style={{
                    color: "#00d4ff",
                    fontFamily: "Orbitron",
                    fontSize: 10,
                    letterSpacing: 2.5,
                    fontWeight: 700,
                  }}
                >
                  {t.hero.status}
                </span>
              </div>

              <p className="rfm-greeting">{t.hero.greeting}</p>

              <div className="rfm-nameWrap">
                <span className="rfm-nameTop">{t.hero.nameTop}</span>
                <span className="rfm-nameBot">{t.hero.nameBot}</span>
              </div>

              <div className="rfm-twWrap">
                <span className="rfm-twText">{displayed}</span>
                <span className="rfm-cursor" />
              </div>

              <p className="rfm-bio">
                {t.hero.bio}
              </p>

              <div className="rfm-stats">
                {[
                  ["1", t.hero.stats.exp],
                  ["6+", t.hero.stats.projects],
                  ["99%", t.hero.stats.uptime],
                ].map(([num, lbl]) => (
                  <div key={lbl} className="rfm-stat">
                    <div className="rfm-statNum">{num}</div>
                    <div className="rfm-statLabel">{lbl}</div>
                  </div>
                ))}
              </div>

              <div className="rfm-ctas">
                <button
                  className="rfm-btnPrimary"
                  onClick={() =>
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  VIEW MY WORK →
                </button>
                <button
                  className="rfm-btnOutline"
                  onClick={() => window.open("https://drive.google.com/file/d/1uMT1Tdsd4iJk4MnG0VUD8FspHxiSIRb6/view?usp=sharing", "_blank")}
                >
                  DOWNLOAD CV
                </button>
              </div>

              <div className="rfm-socials">
                {[
                  {
                    icon: FiGithub,
                    href: "https://github.com/rizalfikrim",
                    label: "GitHub",
                  },
                  {
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/rizalfikrimulyana",
                    label: "LinkedIn",
                  },
                  {
                    icon: FiMail,
                    href: "mailto:rizalfikrim13@gmail.com",
                    label: "Email",
                  },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    className="rfm-soc"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: AI Robot ─── */}
            <div className="rfm-robot-wrap">
              <div
                className="rfm-robot-inner"
                style={{ width: "100%", height: "100%" }}
              >
                <Lanyard />
              </div>
            </div>
          </div>
        </div>

        <button
          className="rfm-scroll"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <span>SCROLL</span>
          <span className="rfm-chev" style={{ fontSize: 16 }}>
            ↓
          </span>
        </button>
      </section>
    </>
  );
}
