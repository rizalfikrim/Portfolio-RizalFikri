"use client";

import { useState, useEffect, useCallback, JSX } from "react";

/* ── Types ── */
type Category =
  | "Professional"
  | "Training"
  | "Language"
  | "Experience"
  | "Technical";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: Category;
  image?: string;
  credentialId?: string;
}

interface CategoryStyle {
  from: string;
  to: string;
  accent: string;
  icon: string;
}

interface OffsetConfig {
  dx: number;
  rotY: number;
  scale: number;
  z: number;
  opacity: number;
}

interface Slot {
  certIndex: number;
  offsetConfig: OffsetConfig;
  slot: number;
}

const useLanguage = () => ({
  t: {
    certificates: {
      label: "CREDENTIALS",
      title: "Certificates & Achievements",
      subtitle:
        "A collection of professional credentials and technical training milestones.",
      btnVerify: "Verify Credential",
      stats: {
        total: "Total Certificates",
        categories: "Categories",
        issuers: "Unique Issuers",
      },
    },
  },
});

/* Add image: "/certificate/your-file.jpg" to any entry when you have the files */
const certificates: Certificate[] = [
  {
    id: "1",
    title: "BNSP Certification",
    issuer: "BNSP",
    date: "N/A",
    category: "Professional",
    image: "/certificate/bnsp.jpg",
  },
  {
    id: "2",
    title: "The Basic Of Google Cloud Compute",
    issuer: "Google Cloud",
    date: "N/A",
    category: "Training",
    image: "/certificate/google-cloud.png",
  },
  {
    id: "3",
    title: "IAI Indonesia Certification",
    issuer: "IAI Indonesia",
    date: "N/A",
    category: "Professional",
    image: "/certificate/IAII.jpg",
  },
  {
    id: "4",
    title: "TOEFL Prediction Test",
    issuer: "Lembaga Tes Bahasa, UBSI",
    date: "N/A",
    category: "Language",
    image: "/certificate/toefl.png",
  },
  {
    id: "5",
    title: "Web Developer Internship Certificate",
    issuer: "PT Wavetek Integra Nusa",
    date: "N/A",
    category: "Experience",
    image: "/certificate/magang.jpg",
  },
  {
    id: "6",
    title: "Software Development Bootcamp",
    issuer: "Universitas Bina Sarana Informatika",
    date: "N/A",
    category: "Training",
    image: "/certificate/software-bootcamp.png",
  },
  {
    id: "7",
    title: "Machine Learning Bootcamp",
    issuer: "DQlab",
    date: "N/A",
    category: "Training",
    image: "/certificate/ml-bootcamp.png",
  },
  {
    id: "8",
    title: "Data Analyst Bootcamp",
    issuer: "DQlab",
    date: "N/A",
    category: "Training",
    image: "/certificate/bootcamp-analyst.png",
  },
  {
    id: "9",
    title: "Frontend Development",
    issuer: "Dicoding",
    date: "N/A",
    category: "Technical",
    image: "/certificate/frontend.jpg",
  },
  {
    id: "10",
    title: "Flutter Coding Camp",
    issuer: "Harisenin",
    date: "N/A",
    category: "Technical",
    image: "/certificate/flutter.jpg",
  },
  {
    id: "11",
    title: "Dicoding Academy Study With Python",
    issuer: "Dicoding",
    date: "N/A",
    category: "Technical",
    image: "/certificate/python-dicoding.png",
  },
  {
    id: "12",
    title: "Data Analysis with SQL & Python",
    issuer: "DQlab",
    date: "N/A",
    category: "Technical",
    image: "/certificate/analyst-sql-pyhton.png",
  },
  {
    id: "13",
    title: "Dicoding Academy Study Machine Learning",
    issuer: "Dicoding",
    date: "N/A",
    category: "Technical",
    image: "/certificate/ml-dicoding.png",
  },
];

const categoryConfig: Record<Category, CategoryStyle> = {
  Professional: {
    from: "#0ea5e9",
    to: "#06b6d4",
    accent: "rgba(14,165,233,0.18)",
    icon: "🏆",
  },
  Training: {
    from: "#8b5cf6",
    to: "#00d4ff",
    accent: "rgba(139,92,246,0.18)",
    icon: "📚",
  },
  Language: {
    from: "#10b981",
    to: "#34d399",
    accent: "rgba(16,185,129,0.18)",
    icon: "🗣️",
  },
  Experience: {
    from: "#ef4444",
    to: "#ec4899",
    accent: "rgba(239,68,68,0.18)",
    icon: "💼",
  },
  Technical: {
    from: "#8b5cf6",
    to: "#a78bfa",
    accent: "rgba(139,92,246,0.18)",
    icon: "💻",
  },
};

/* ── SVG Placeholder rendered when no image is provided ── */
function CertPlaceholder({
  colors,
  issuer,
  icon,
  uid,
}: {
  colors: CategoryStyle;
  issuer: string;
  icon: string;
  uid: string;
}) {
  const dots: JSX.Element[] = [];
  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 7; row++) {
      dots.push(
        <circle
          key={`${col}-${row}`}
          cx={col * 27 + 9}
          cy={row * 27 + 9}
          r="0.9"
          fill={colors.from}
          fillOpacity="0.16"
        />,
      );
    }
  }

  const ringLines: JSX.Element[] = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ringLines.push(
      <line
        key={i}
        x1={150 + Math.cos(angle) * 30}
        y1={74 + Math.sin(angle) * 30}
        x2={150 + Math.cos(angle) * 34}
        y2={74 + Math.sin(angle) * 34}
        stroke={colors.from}
        strokeOpacity="0.5"
        strokeWidth="1.3"
      />,
    );
  }

  return (
    <svg
      viewBox="0 0 300 170"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.from} stopOpacity="0.20" />
          <stop offset="100%" stopColor={colors.to} stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id={`hl${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.from} stopOpacity="0" />
          <stop offset="45%" stopColor={colors.from} stopOpacity="0.85" />
          <stop offset="55%" stopColor={colors.to} stopOpacity="0.85" />
          <stop offset="100%" stopColor={colors.to} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base */}
      <rect width="300" height="170" fill="#07071e" />
      <rect width="300" height="170" fill={`url(#bg${uid})`} />

      {/* Grid dots */}
      {dots}

      {/* Horizontal rules */}
      <rect x="0" y="30" width="300" height="0.7" fill={`url(#hl${uid})`} />
      <rect x="0" y="140" width="300" height="0.7" fill={`url(#hl${uid})`} />

      {/* Corner TL */}
      <path
        d="M0,0 L24,0 L24,2.5 L2.5,2.5 L2.5,24 L0,24 Z"
        fill={colors.from}
        fillOpacity="0.70"
      />
      <path
        d="M0,0 L14,0 L14,1 L1,1 L1,14 L0,14 Z"
        fill={colors.from}
        fillOpacity="1"
      />
      {/* Corner TR */}
      <path
        d="M300,0 L276,0 L276,2.5 L297.5,2.5 L297.5,24 L300,24 Z"
        fill={colors.to}
        fillOpacity="0.70"
      />
      <path
        d="M300,0 L286,0 L286,1 L299,1 L299,14 L300,14 Z"
        fill={colors.to}
        fillOpacity="1"
      />
      {/* Corner BL */}
      <path
        d="M0,170 L24,170 L24,167.5 L2.5,167.5 L2.5,146 L0,146 Z"
        fill={colors.from}
        fillOpacity="0.70"
      />
      {/* Corner BR */}
      <path
        d="M300,170 L276,170 L276,167.5 L297.5,167.5 L297.5,146 L300,146 Z"
        fill={colors.to}
        fillOpacity="0.70"
      />

      {/* Seal ring */}
      <circle
        cx="150"
        cy="74"
        r="35"
        fill={colors.from}
        fillOpacity="0.08"
        stroke={colors.from}
        strokeOpacity="0.30"
        strokeWidth="0.8"
      />
      <circle
        cx="150"
        cy="74"
        r="27"
        fill={colors.from}
        fillOpacity="0.06"
        stroke={colors.from}
        strokeOpacity="0.20"
        strokeWidth="0.5"
      />
      {ringLines}

      {/* Icon */}
      <text
        x="150"
        y="82"
        textAnchor="middle"
        fontSize="24"
        fontFamily="system-ui"
      >
        {icon}
      </text>

      {/* Label */}
      <text
        x="150"
        y="123"
        textAnchor="middle"
        fontSize="6.2"
        fontFamily="'Orbitron',monospace"
        fontWeight="700"
        letterSpacing="2.8"
        fill={colors.from}
        fillOpacity="0.75"
      >
        CERTIFICATE OF COMPLETION
      </text>

      {/* Issuer */}
      <text
        x="150"
        y="136"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="'Rajdhani',sans-serif"
        fontWeight="600"
        fill="rgba(255,255,255,0.42)"
        letterSpacing="0.5"
      >
        {issuer !== "N/A" ? issuer : "Issuer TBA"}
      </text>

      {/* Watermark hint */}
      <text
        x="150"
        y="160"
        textAnchor="middle"
        fontSize="5.5"
        fontFamily="monospace"
        fill="rgba(255,255,255,0.10)"
        letterSpacing="1.5"
      >
        PREVIEW · REPLACE WITH ACTUAL IMAGE
      </text>
    </svg>
  );
}

/* ── Offset configs ── */
const OFFSETS: OffsetConfig[] = [
  { dx: -420, rotY: 45, scale: 0.62, z: -240, opacity: 0.45 },
  { dx: -210, rotY: 25, scale: 0.78, z: -100, opacity: 0.7 },
  { dx: 0, rotY: 0, scale: 1.0, z: 0, opacity: 1.0 },
  { dx: 210, rotY: -25, scale: 0.78, z: -100, opacity: 0.7 },
  { dx: 420, rotY: -45, scale: 0.62, z: -240, opacity: 0.45 },
];

function getSlots(activeIndex: number, total: number): Slot[] {
  return OFFSETS.map((_, i) => {
    const idx = (activeIndex + (i - 2) + total * 10) % total;
    return { certIndex: idx, offsetConfig: OFFSETS[i], slot: i };
  });
}

/* ══════════════════════════════════════════
   Main Component
══════════════════════════════════════════ */
export const Certificates = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<number>(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const total = certificates.length;
  const totalCats = new Set(certificates.map((c) => c.category)).size;
  const totalIssuers = new Set(certificates.map((c) => c.issuer)).size;

  const go = useCallback(
    (dir: number) => {
      setActive((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const slots = getSlots(active, total);
  const activeCert = certificates[active];
  const activeColors = categoryConfig[activeCert.category];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-certs {
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 20% 90%, rgba(0,180,216,0.08) 0%, transparent 55%),
            #020210;
          padding: 100px 0 80px;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
          overflow: hidden;
        }
        .rfm-certs-inner { max-width: 1300px; margin: 0 auto; padding: 0 clamp(20px,4vw,52px); }

        .rfm-certs-header { text-align: center; margin-bottom: 64px; }
        .rfm-section-label {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07); border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px; padding: 7px 18px;
          font-family: 'Orbitron',monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #00d4ff; margin-bottom: 20px;
        }
        .rfm-certs-title {
          font-family: 'Orbitron',monospace;
          font-size: clamp(26px,3.5vw,44px); font-weight: 900; color: #dde8f8; margin: 0 0 14px;
        }
        .rfm-certs-subtitle {
          color: rgba(255,255,255,0.38); font-size: 15px;
          max-width: 520px; margin: 0 auto; line-height: 1.8;
        }

        /* Stage */
        .rfm-carousel-wrap {
          position: relative; height: 430px;
          perspective: 1400px; margin-bottom: 36px;
        }
        .rfm-carousel-stage { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; }

        /* Card */
        .rfm-c-card {
          position: absolute; top: 50%; left: 50%; width: 300px;
          transform-origin: center center; cursor: pointer; will-change: transform,opacity;
        }
        .rfm-c-card-inner {
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          transition: border-color 0.3s;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
        }
        .rfm-c-card.is-active .rfm-c-card-inner { border-color: rgba(0,212,255,0.45); }

        /* Image zone */
        .rfm-c-img-zone {
          position: relative; width: 100%; height: 170px;
          overflow: hidden; background: #07071e; flex-shrink: 0;
        }
        .rfm-c-img-zone img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Shimmer on active */
        .rfm-c-card.is-active .rfm-c-img-zone::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          animation: rfm-shimmer 3s infinite;
        }
        @keyframes rfm-shimmer {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }

        /* Floating badge */
        .rfm-c-img-badge {
          position: absolute; top: 12px; right: 12px;
          padding: 4px 11px; border-radius: 100px;
          font-size: 10px; font-weight: 700;
          color: #fff; letter-spacing: 0.6px;
          backdrop-filter: blur(6px);
        }

        /* Floating icon */
        .rfm-c-img-icon {
          position: absolute; bottom: 12px; left: 14px;
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          background: rgba(5,5,25,0.65);
          border: 1px solid rgba(255,255,255,0.15);
        }

        /* Info zone */
        .rfm-c-info-zone {
          padding: 16px 18px 18px;
          background: rgba(5,5,25,0.96);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .rfm-c-name {
          font-family: 'Orbitron',monospace; font-size: 12.5px; font-weight: 700;
          color: #dde8f8; margin: 0 0 7px; line-height: 1.45;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .rfm-c-issuer { font-size: 12px; font-weight: 600; color: #00d4ff; margin: 0 0 4px; }
        .rfm-c-date   { font-size: 11px; color: rgba(255,255,255,0.28); margin: 0; }

        /* Glow bar at bottom of active card */
        .rfm-c-glow-bar { height: 3px; }

        /* Nav arrows */
        .rfm-carousel-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 46px; height: 46px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,212,255,0.25); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10;
          transition: background 0.2s, border-color 0.2s;
          color: #00d4ff; font-size: 22px; line-height: 1; user-select: none;
        }
        .rfm-carousel-nav:hover { background: rgba(0,212,255,0.12); border-color: rgba(0,212,255,0.5); }
        .rfm-carousel-nav.left  { left: 0; }
        .rfm-carousel-nav.right { right: 0; }

        /* Dots */
        .rfm-carousel-dots {
          display: flex; justify-content: center;
          gap: 8px; margin-bottom: 40px; flex-wrap: wrap;
        }
        .rfm-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          cursor: pointer; transition: background 0.25s, transform 0.25s;
        }
        .rfm-dot.active { background: #00d4ff; transform: scale(1.4); }

        /* Active info strip */
        .rfm-cert-info { text-align: center; margin-bottom: 44px; min-height: 44px; }
        .rfm-cert-info-name {
          font-family: 'Orbitron',monospace; font-size: 16px; font-weight: 700;
          color: #dde8f8; margin: 0 0 6px;
        }
        .rfm-cert-info-meta { font-size: 13px; color: rgba(255,255,255,0.38); }
        .rfm-cert-info-meta span { color: #00d4ff; font-weight: 600; }

        /* Stats */
        .rfm-cert-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .rfm-cert-stat {
          text-align: center;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(0,212,255,0.1);
          border-radius: 14px; padding: 22px 12px; transition: border-color 0.25s;
        }
        .rfm-cert-stat:hover { border-color: rgba(0,212,255,0.25); }
        .rfm-cert-stat-num {
          font-family: 'Orbitron',monospace; font-size: 32px; font-weight: 700;
          display: block; margin-bottom: 6px;
        }
        .rfm-cert-stat-lbl { font-size: 12px; color: rgba(255,255,255,0.32); letter-spacing: 0.4px; }

        @media (max-width: 700px) {
          .rfm-carousel-wrap { height: 370px; }
          .rfm-c-card { width: 250px; }
          .rfm-c-img-zone { height: 140px; }
          .rfm-cert-stats { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="certificates" className="rfm-certs">
        <div className="rfm-certs-inner">
          <div className="rfm-certs-header">
            <div className="rfm-section-label">{t.certificates.label}</div>
            <h2 className="rfm-certs-title">{t.certificates.title}</h2>
            <p className="rfm-certs-subtitle">{t.certificates.subtitle}</p>
          </div>

          <div className="rfm-carousel-wrap">
            <button
              className="rfm-carousel-nav left"
              onClick={() => go(-1)}
              aria-label="Previous"
            >
              ‹
            </button>

            <div className="rfm-carousel-stage">
              {slots.map(({ certIndex, offsetConfig, slot }) => {
                const cert = certificates[certIndex];
                const colors = categoryConfig[cert.category];
                const isActive = slot === 2;
                const { dx, rotY, scale, z, opacity } = offsetConfig;
                const usePlaceholder = !cert.image || imgError[cert.id];

                return (
                  <div
                    key={slot}
                    className={`rfm-c-card${isActive ? " is-active" : ""}`}
                    style={{
                      transform: `translate(-50%,-50%) translateX(${dx}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
                      opacity,
                      transition:
                        "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.45s ease",
                      zIndex: isActive ? 5 : 3 - Math.abs(slot - 2),
                    }}
                    onClick={() => {
                      const d = slot - 2;
                      if (d !== 0) go(d);
                    }}
                  >
                    <div className="rfm-c-card-inner">
                      {/* Image / Placeholder */}
                      <div className="rfm-c-img-zone">
                        {usePlaceholder ? (
                          <CertPlaceholder
                            colors={colors}
                            issuer={cert.issuer}
                            icon={colors.icon}
                            uid={cert.id}
                          />
                        ) : (
                          <img
                            src={cert.image}
                            alt={cert.title}
                            onError={() =>
                              setImgError((prev) => ({
                                ...prev,
                                [cert.id]: true,
                              }))
                            }
                          />
                        )}

                        <span
                          className="rfm-c-img-badge"
                          style={{
                            background: `linear-gradient(135deg,${colors.from},${colors.to})`,
                          }}
                        >
                          {cert.category}
                        </span>

                        <div className="rfm-c-img-icon">{colors.icon}</div>
                      </div>

                      {/* Info */}
                      <div className="rfm-c-info-zone">
                        <h3 className="rfm-c-name">{cert.title}</h3>
                        <p className="rfm-c-issuer">{cert.issuer}</p>
                        <p className="rfm-c-date">{cert.date}</p>
                      </div>

                      {/* Bottom glow bar on active */}
                      {isActive && (
                        <div
                          className="rfm-c-glow-bar"
                          style={{
                            background: `linear-gradient(90deg,${colors.from},${colors.to})`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="rfm-carousel-nav right"
              onClick={() => go(1)}
              aria-label="Next"
            >
              ›
            </button>
          </div>

          {/* Active cert info */}
          <div className="rfm-cert-info">
            <p className="rfm-cert-info-name">{activeCert.title}</p>
            <p className="rfm-cert-info-meta">
              Issued by <span>{activeCert.issuer}</span>&nbsp;·&nbsp;
              {activeCert.category}
            </p>
          </div>

          {/* Dots */}
          <div className="rfm-carousel-dots">
            {certificates.map((_, i) => (
              <div
                key={i}
                className={`rfm-dot${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          {/* Stats */}
          <div className="rfm-cert-stats">
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#00d4ff" }}>
                {certificates.length}
              </span>
              <span className="rfm-cert-stat-lbl">
                {t.certificates.stats.total}
              </span>
            </div>
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#a78bfa" }}>
                {totalCats}
              </span>
              <span className="rfm-cert-stat-lbl">
                {t.certificates.stats.categories}
              </span>
            </div>
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#f59e0b" }}>
                {totalIssuers}
              </span>
              <span className="rfm-cert-stat-lbl">
                {t.certificates.stats.issuers}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Certificates;
