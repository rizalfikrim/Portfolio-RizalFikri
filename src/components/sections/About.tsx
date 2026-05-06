"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiDownload, FiAward } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";

/* ── Animated Counter ── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────
   About Component
──────────────────────────────────────────── */
export const About = () => {
  const { t } = useLanguage();

  const infoItems = [
    {
      icon: "🎓",
      label: t.about.info.education,
      value: "Information Systems, Bina Sarana Informatika University",
    },
    { icon: "📍", label: t.about.info.location, value: "Bogor, West Java, Indonesia" },
    { icon: "💼", label: t.about.info.experience, value: "1 Year" },
    { icon: "🌐", label: t.about.info.languages, value: "Bahasa Indonesia, English" },
  ];

  const stats = [
    { value: 6, suffix: "+", label: t.about.stats.projects },
    { value: 1, suffix: "", label: t.about.stats.exp },
    { value: 10, suffix: "+", label: t.about.stats.tech },
    { value: 100, suffix: "%", label: t.about.stats.passion },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-about {
          background:
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,180,216,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 55%),
            #020210;
          padding: 100px 0;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .rfm-section-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px;
          padding: 7px 18px;
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #00d4ff;
          margin-bottom: 20px;
        }

        .rfm-about-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
        }

        .rfm-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        /* ── Photo side ── */
        .rfm-photo-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .rfm-hex-outer {
          position: relative;
          width: 320px;
          height: 320px;
        }

        .rfm-hex-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%);
          animation: rfm-blobPulse 6s ease-in-out infinite;
        }

        .rfm-hex-frame {
          position: relative;
          width: 100%;
          height: 100%;
          clip-path: polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%);
          background: linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12));
          border: 2px solid rgba(0,212,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .rfm-hex-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .rfm-hex-bracket {
          position: absolute;
          font-family: 'Orbitron', monospace;
          font-size: 28px;
          color: rgba(0,212,255,0.4);
          line-height: 1;
        }

        /* ── Buttons ── */
        .rfm-about-btns { display: flex; gap: 12px; margin-top: 20px; }
        .rfm-about-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          font-family: 'Orbitron', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
        }
        .btn-resume { background: #00d4ff; color: #020210; }
        .btn-certs { background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
        .rfm-about-btn:hover { opacity: 0.8; transform: translateY(-2px); }

        /* ── Content side ── */
        .rfm-about-content { display: flex; flex-direction: column; gap: 28px; }

        .rfm-about-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(26px, 3vw, 40px);
          font-weight: 900;
          color: #dde8f8;
          line-height: 1.15;
          margin: 0 0 10px;
        }

        .rfm-about-sub {
          color: rgba(255,255,255,0.38);
          font-size: 14.5px;
          line-height: 1.85;
          margin: 0;
        }

        .rfm-bio-block { display: flex; flex-direction: column; gap: 14px; }

        .rfm-bio-p {
          color: rgba(255,255,255,0.42);
          font-size: 14.5px;
          line-height: 1.9;
          margin: 0;
        }

        /* Info grid */
        .rfm-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .rfm-info-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 12px;
          transition: border-color 0.25s, background 0.25s;
        }
        .rfm-info-card:hover {
          border-color: rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.04);
        }

        .rfm-info-icon { font-size: 18px; flex-shrink: 0; }

        .rfm-info-label {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.5px;
          margin: 0 0 2px;
        }
        .rfm-info-value {
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.82);
          margin: 0;
        }

        /* Stats row */
        .rfm-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .rfm-stat-block { text-align: center; }

        .rfm-stat-num {
          font-family: 'Orbitron', monospace;
          font-size: 26px;
          font-weight: 700;
          color: #00d4ff;
          display: block;
          margin-bottom: 4px;
        }

        .rfm-stat-lbl {
          font-size: 11px;
          color: rgba(255,255,255,0.32);
          letter-spacing: 0.4px;
        }

        @keyframes rfm-blobPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.06); opacity: 0.7; }
        }

        @media (max-width: 860px) {
          .rfm-about-grid { grid-template-columns: 1fr; }
          .rfm-hex-outer  { width: 240px; height: 240px; }
          .rfm-stats-row  { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 480px) {
          .rfm-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="about" className="rfm-about">
        <div className="rfm-about-inner">
          <div className="rfm-about-grid">
            {/* ── Left: Photo ── */}
            <div className="rfm-photo-wrap">
              <div className="rfm-hex-outer">
                <div className="rfm-hex-glow" />
                <div className="rfm-hex-frame">
                  <Image
                    src="/about/ijal.jpeg"
                    alt="Ijal Portrait"
                    width={320}
                    height={320}
                    className="rfm-hex-image"
                    priority
                  />
                </div>
                <span className="rfm-hex-bracket" style={{ top: -8, left: -8 }}>[</span>
                <span className="rfm-hex-bracket" style={{ top: -8, right: -8 }}>]</span>
                <span className="rfm-hex-bracket" style={{ bottom: -8, left: -8 }}>[</span>
                <span className="rfm-hex-bracket" style={{ bottom: -8, right: -8 }}>]</span>
              </div>
              <div className="rfm-about-btns">
                <button className="rfm-about-btn btn-resume" onClick={() => window.open("https://drive.google.com/file/d/1uMT1Tdsd4iJk4MnG0VUD8FspHxiSIRb6/view?usp=sharing", "_blank")}>
                  <FiDownload /> {t.about.btnResume}
                </button>
                <button className="rfm-about-btn btn-certs" onClick={() => document.getElementById("certificates")?.scrollIntoView({ behavior: "smooth" })}>
                  <FiAward /> {t.about.btnCertificates}
                </button>
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="rfm-about-content">
              <div>
                <div className="rfm-section-label">{t.about.label}</div>
                <h2 className="rfm-about-title">{t.about.title}</h2>
                <p className="rfm-about-sub">{t.about.subtitle}</p>
              </div>

              <div className="rfm-bio-block">
                <p className="rfm-bio-p">
                  {t.about.bio1}
                </p>
                <p className="rfm-bio-p">
                  {t.about.bio2}
                </p>
              </div>

              {/* Info grid */}
              <div className="rfm-info-grid">
                {infoItems.map((item) => (
                  <div key={item.label} className="rfm-info-card">
                    <span className="rfm-info-icon">{item.icon}</span>
                    <div>
                      <p className="rfm-info-label">
                        {item.label.toUpperCase()}
                      </p>
                      <p className="rfm-info-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="rfm-stats-row">
                {stats.map((stat) => (
                  <div key={stat.label} className="rfm-stat-block">
                    <span className="rfm-stat-num">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                      />
                    </span>
                    <span className="rfm-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {/* <div>
                <button
                  className="rfm-cv-btn"
                  onClick={() => window.open("https://drive.google.com/file/d/1uMT1Tdsd4iJk4MnG0VUD8FspHxiSIRb6/view?usp=sharing", "_blank")}
                >
                  DOWNLOAD CV →
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
