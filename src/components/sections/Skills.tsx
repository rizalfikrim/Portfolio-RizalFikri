"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

/* ── Types ── */
interface Skill {
  name: string;
  icon: string;
  level: number;
}
interface Category {
  category: string;
  icon: string;
  skills: Skill[];
}

/* ── Stub data — replace with your real import ── */
const skillCategories: Category[] = [
  {
    category: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Express.js", icon: "🟩", level: 85 },
      { name: "NestJS", icon: "🐱", level: 80 },
      { name: "Laravel", icon: "🐘", level: 80 },
      { name: "CodeIgniter", icon: "🔥", level: 85 },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", icon: "🐘", level: 85 },
      { name: "MySQL", icon: "🐬", level: 85 },
    ],
  },
  {
    category: "Languages",
    icon: "💻",
    skills: [
      { name: "JavaScript", icon: "🟨", level: 90 },
      { name: "Python", icon: "🐍", level: 85 },
      { name: "PHP", icon: "🐘", level: 85 },
      { name: "Dart", icon: "🎯", level: 75 },
    ],
  },
  {
    category: "Frontend",
    icon: "🎨",
    skills: [
      { name: "HTML/CSS", icon: "🌐", level: 90 },
      { name: "Bootstrap", icon: "🅱️", level: 85 },
      { name: "Next.js", icon: "▲", level: 80 },
    ],
  },
  {
    category: "Tools",
    icon: "🛠️",
    skills: [
      { name: "Docker", icon: "🐳", level: 75 },
      { name: "GitHub", icon: "🐙", level: 85 },
      { name: "Nginx", icon: "🟢", level: 75 },
      { name: "VPS", icon: "🖥️", level: 75 },
    ],
  },
];

const learningSkills = ["Advanced Cloud", "Microservices Architecture", "CI/CD Pipelines", "GraphQL"];

const overallSkills = [
  { name: "Backend", level: 85 },
  { name: "Frontend", level: 80 },
  { name: "Database", level: 85 },
  { name: "DevOps", level: 75 },
  { name: "Solving", level: 90 },
  { name: "Architecture", level: 80 },
];

/* ── Radar Chart ── */
function RadarChart({ skills, t }: { skills: { name: string; level: number }[], t?: any }) {
  const size = 220;
  const center = size / 2;
  const radius = center - 28;
  const n = skills.length;
  const angles = skills.map((_, i) => (i * 2 * Math.PI) / n - Math.PI / 2);

  const toXY = (angle: number, r: number) => ({
    x: center + r * Math.cos(angle),
    y: center + r * Math.sin(angle),
  });

  const radarPoints = skills
    .map((s, i) => {
      const p = toXY(angles[i], (s.level / 100) * radius);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((s) => (
          <circle
            key={s}
            cx={center}
            cy={center}
            r={radius * s}
            fill="none"
            stroke="rgba(0,212,255,0.1)"
            strokeWidth="1"
          />
        ))}
        {/* Axis lines */}
        {angles.map((a, i) => {
          const p = toXY(a, radius);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={p.x}
              y2={p.y}
              stroke="rgba(0,212,255,0.18)"
              strokeWidth="1"
            />
          );
        })}
        {/* Radar shape */}
        <polygon
          points={radarPoints}
          fill="rgba(0,212,255,0.08)"
          stroke="rgba(0,212,255,0.5)"
          strokeWidth="2"
        />
        {/* Labels */}
        {skills.map((s, i) => {
          const p = toXY(angles[i], radius + 20);
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fill: "rgba(255,255,255,0.38)",
                fontSize: 9,
                fontFamily: "'Rajdhani', sans-serif",
              }}
            >
              {s.name}
            </text>
          );
        })}
      </svg>
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 14,
            fontWeight: 700,
            color: "#dde8f8",
            margin: "0 0 4px",
          }}
        >
          {t?.skills?.radarTitle || "Overall Proficiency"}
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", margin: 0 }}>
          {t?.skills?.radarSubtitle || "Backend-focused skill distribution"}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Skills Component
──────────────────────────────────────────── */
export const Skills = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(
    skillCategories[0].category,
  );
  const activeSkills =
    skillCategories.find((c) => c.category === activeCategory)?.skills ?? [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-skills {
          background:
            radial-gradient(ellipse 80% 60% at 80% 20%, rgba(124,58,237,0.09) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 10% 80%, rgba(0,180,216,0.07) 0%, transparent 55%),
            #020210;
          padding: 100px 0;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
        }

        .rfm-skills-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
        }

        .rfm-skills-header { text-align: center; margin-bottom: 56px; }

        .rfm-section-label {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px; padding: 7px 18px;
          font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #00d4ff; margin-bottom: 20px;
        }

        .rfm-skills-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 900; color: #dde8f8; margin: 0 0 14px;
        }

        .rfm-skills-subtitle {
          color: rgba(255,255,255,0.38);
          font-size: 15px; max-width: 520px; margin: 0 auto;
          line-height: 1.8;
        }

        /* Tabs */
        .rfm-tabs {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 10px; margin-bottom: 48px;
        }

        .rfm-tab {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 100px;
          font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.22s; border: none;
        }
        .rfm-tab-active {
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          color: #fff;
          box-shadow: 0 4px 18px rgba(0,212,255,0.2);
        }
        .rfm-tab-idle {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,212,255,0.12) !important;
          color: rgba(255,255,255,0.5);
        }
        .rfm-tab-idle:hover {
          background: rgba(0,212,255,0.07);
          color: rgba(255,255,255,0.85);
          border-color: rgba(0,212,255,0.28) !important;
        }

        /* Main grid */
        .rfm-skills-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 48px;
          align-items: start;
        }

        .rfm-skill-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .rfm-skill-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.25s, background 0.25s;
        }
        .rfm-skill-card:hover {
          border-color: rgba(0,212,255,0.28);
          background: rgba(0,212,255,0.04);
        }

        .rfm-skill-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
          margin-bottom: 14px;
        }

        .rfm-skill-left { display: flex; align-items: flex-start; gap: 10px; flex: 1; min-width: 0; }

        .rfm-skill-icon { font-size: 22px; flex-shrink: 0; }

        .rfm-skill-name {
          font-size: 14.5px; font-weight: 600;
          color: rgba(255,255,255,0.88); margin: 0 0 3px;
        }

        .rfm-skill-tier {
          font-size: 11px; color: rgba(255,255,255,0.32);
          margin: 0; letter-spacing: 0.3px;
        }

        .rfm-skill-pct {
          font-family: 'Orbitron', monospace;
          font-size: 18px; font-weight: 700;
          color: #00d4ff; flex-shrink: 0;
        }

        /* Progress bar */
        .rfm-bar-track {
          height: 4px; background: rgba(255,255,255,0.07);
          border-radius: 100px; overflow: hidden;
        }
        .rfm-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d4ff 0%, #7c3aed 100%);
          border-radius: 100px;
          transition: width 1s cubic-bezier(.25,.8,.25,1);
        }

        /* Currently learning */
        .rfm-learning { margin-top: 64px; text-align: center; }

        .rfm-learning-title {
          font-family: 'Orbitron', monospace;
          font-size: 20px; font-weight: 700;
          color: #dde8f8; margin: 0 0 28px;
        }

        .rfm-learning-chips {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 14px;
        }

        .rfm-chip {
          position: relative;
          padding: 9px 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,212,255,0.2);
          border-radius: 100px;
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.72);
          transition: all 0.22s;
        }
        .rfm-chip:hover {
          background: rgba(0,212,255,0.07);
          border-color: rgba(0,212,255,0.4);
          color: #00d4ff;
        }

        .rfm-chip-dot {
          position: absolute; top: -4px; right: -4px;
          width: 10px; height: 10px;
          background: rgba(245, 158, 11, 0.9);
          border-radius: 50%;
        }
        .rfm-chip-dot::after {
          content: '';
          position: absolute; inset: -3px;
          border-radius: 50%;
          border: 1px solid rgba(245, 158, 11, 0.4);
          animation: rfm-chipPing 1.8s ease-in-out infinite;
        }
        @keyframes rfm-chipPing {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0; transform: scale(1.8); }
        }

        @media (max-width: 900px) {
          .rfm-skills-body { grid-template-columns: 1fr; }
        }

        @media (max-width: 520px) {
          .rfm-skill-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="skills" className="rfm-skills">
        <div className="rfm-skills-inner">
          {/* Header */}
          <div className="rfm-skills-header">
            <div className="rfm-section-label">{t.skills.label}</div>
            <h2 className="rfm-skills-title">{t.skills.title}</h2>
            <p className="rfm-skills-subtitle">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div className="rfm-tabs">
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                className={`rfm-tab ${activeCategory === cat.category ? "rfm-tab-active" : "rfm-tab-idle"}`}
                onClick={() => setActiveCategory(cat.category)}
              >
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="rfm-skills-body">
            {/* Skill cards */}
            <div className="rfm-skill-cards">
              {activeSkills.map((skill) => {
                const tier =
                  skill.level >= 90
                    ? t.skills.tiers.expert
                    : skill.level >= 75
                      ? t.skills.tiers.advanced
                      : skill.level >= 60
                        ? t.skills.tiers.intermediate
                        : t.skills.tiers.beginner;
                return (
                  <div key={skill.name} className="rfm-skill-card">
                    <div className="rfm-skill-top">
                      <div className="rfm-skill-left">
                        <span className="rfm-skill-icon">{skill.icon}</span>
                        <div>
                          <p className="rfm-skill-name">{skill.name}</p>
                          <p className="rfm-skill-tier">{tier}</p>
                        </div>
                      </div>
                      <span className="rfm-skill-pct">{skill.level}%</span>
                    </div>
                    <div className="rfm-bar-track">
                      <div
                        className="rfm-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Radar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart skills={overallSkills} t={t} />
            </div>
          </div>

          {/* Currently Learning */}
          <div className="rfm-learning">
            <h3 className="rfm-learning-title">{t.skills.learningTitle}</h3>
            <div className="rfm-learning-chips">
              {learningSkills.map((s) => (
                <div key={s} className="rfm-chip">
                  {s}
                  <div className="rfm-chip-dot" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
