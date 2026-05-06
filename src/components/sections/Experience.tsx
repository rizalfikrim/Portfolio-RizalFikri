"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface Experience {
  id: string;
  position: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  tech: string[];
}
interface Project {
  id: string;
  title: string;
  category: string[];
  year: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  live?: string;
}

const experiences: Experience[] = [
  {
    id: "1",
    position: "Backend Developer Intern",
    company: "PT Mitra Graha Integrasi",
    type: "Internship",
    period: "Nov 2025 – Present",
    location: "Indonesia",
    description: [
      "Backend development for company profile CMS",
      "Worked with Nest.js to build CMS applications",
    ],
    tech: ["NestJS", "TypeScript"],
  },
  {
    id: "2",
    position: "Web Developer Intern",
    company: "PT Wavetek Integra Nusa",
    type: "Internship",
    period: "Jul 2024 – Okt 2024",
    location: "Indonesia",
    description: [
      "Developed web-based ticketing IT helpdesk system",
      "Worked with CodeIgniter to build robust applications",
    ],
    tech: ["CodeIgniter", "PHP", "MySQL"],
  },
];

const projects: Project[] = [
  {
    id: "1",
    title: "Money Tracker App",
    category: ["Mobile"],
    year: "2025",
    description:
      "Mobile application for tracking personal finances with an intuitive interface.",
    highlights: [
      "Built with Flutter for cross-platform support",
      "Intuitive user interface for tracking expenses",
    ],
    tech: ["Flutter", "Dart", "Hive Flutter"],
    github: "#",
  },
  {
    id: "2",
    title: "Sistem Aplikasi Berbasis Web Laundry",
    category: ["Web", "Full-Stack"],
    year: "2024",
    description:
      "A comprehensive laundry management system built with CodeIgniter.",
    highlights: [
      "Order tracking and management",
      "Reporting and analytics for laundry business",
    ],
    tech: ["CodeIgniter", "PHP", "MySQL", "Bootstrap", "SB Admin 2"],
    github: "#",
  },
  {
    id: "3",
    title: "Nota Dinas KOMINFOTIK Jakarta Selatan",
    category: ["Web", "Full-Stack"],
    year: "2024",
    description:
      "Web-based official memo application for KOMINFOTIK Jakarta Selatan.",
    highlights: [
      "Streamlined official communications",
      "Digital memo tracking and archiving",
    ],
    tech: ["CodeIgniter", "PHP", "MySQL"],
    github: "#",
  },
  {
    id: "4",
    title: "Company Profile CMS PT.Mitra Graha Integrasi",
    category: ["Backend", "Web", "API"],
    year: "2025",
    description:
      "Content Management System for company profile built with NestJS.",
    highlights: [
      "Custom CMS features",
      "Built with modern Node.js framework (NestJS)",
    ],
    tech: [
      "NestJS",
      "TypeScript",
      "Node.js",
      "MySQL",
      "Next.JS",
      "Tailwind",
      "Swagger Open API",
      "Prisma ORM",
      "Docker",
    ],
    github: "#",
  },
  {
    id: "5",
    title: "ReflectQ App",
    category: ["Mobile", "Backend"],
    year: "2024",
    description:
      "ReflectQ is an application built with Supabase providing a scalable backend.",
    highlights: [
      "Real-time data synchronization",
      "Powered by Supabase for backend as a service",
    ],
    tech: ["Supabase", "React Native", "PostgreSQL", "OAuth", "CornJob"],
    github: "#",
  },
  {
    id: "6",
    title: "Ticketing IT Helpdesk PT.Wavetek Integra Nusa",
    category: ["Web", "Full-Stack"],
    year: "2024",
    description:
      "An IT helpdesk ticketing system built with CodeIgniter to manage internal IT issues.",
    highlights: [
      "Issue tracking and resolution management",
      "User-friendly interface for submitting tickets",
    ],
    tech: [
      "CodeIgniter",
      "PHP",
      "MySQL",
      "Bootstrap",
      "Admin LTE",
      "Data Table",
    ],
    github: "#",
  },
];

const projectCategories = [
  "All",
  "Backend",
  "API",
  "Full-Stack",
  "Web",
  "Mobile",
];
type ViewType = "experience" | "projects";

/* ── Animated Timeline Line ── */
function useTimelineScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0 → 1 as the timeline scrolls from entering viewport to fully passed
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      const p = Math.min(1, Math.max(0, scrolled / total));
      setProgress(p);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [ref]);

  return progress;
}

/* ── Card entrance animation ── */
function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else setVisible(false); // reverse when scrolling back up
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export const Experience = () => {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<ViewType>("experience");
  const [projectFilter, setProjectFilter] = useState("All");
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineProgress = useTimelineScroll(timelineRef);

  const filteredProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((p) => p.category.some((cat) => cat === projectFilter));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-exp {
          background:
            radial-gradient(ellipse 70% 60% at 15% 30%, rgba(0,180,216,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 85% 70%, rgba(124,58,237,0.08) 0%, transparent 55%),
            #020210;
          padding: 100px 0;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
        }

        .rfm-exp-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
        }

        .rfm-exp-header { text-align: center; margin-bottom: 56px; }

        .rfm-section-label {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px; padding: 7px 18px;
          font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #00d4ff; margin-bottom: 20px;
        }

        .rfm-exp-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 900; color: #dde8f8; margin: 0 0 14px;
        }

        .rfm-exp-subtitle {
          color: rgba(255,255,255,0.38); font-size: 15px; margin: 0; line-height: 1.8;
        }

        /* Toggle */
        .rfm-toggle-wrap { display: flex; justify-content: center; margin-bottom: 48px; }
        .rfm-toggle {
          display: inline-flex;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.12);
          border-radius: 12px; padding: 4px;
        }
        .rfm-toggle-btn {
          padding: 11px 32px;
          border-radius: 9px;
          font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; cursor: pointer; border: none; transition: all 0.22s;
        }
        .rfm-toggle-active {
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          color: #fff;
        }
        .rfm-toggle-idle { background: transparent; color: rgba(255,255,255,0.38); }
        .rfm-toggle-idle:hover { color: rgba(255,255,255,0.7); }

        /* Filter chips */
        .rfm-filter-row {
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 10px; margin-bottom: 40px;
        }
        .rfm-filter-chip {
          padding: 8px 18px; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer; border: 1px solid transparent; transition: all 0.22s;
        }
        .rfm-filter-active {
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          color: #fff;
        }
        .rfm-filter-idle {
          background: rgba(255,255,255,0.03);
          border-color: rgba(0,212,255,0.12);
          color: rgba(255,255,255,0.45);
        }
        .rfm-filter-idle:hover {
          background: rgba(0,212,255,0.07);
          color: rgba(255,255,255,0.75);
        }

        /* ── Timeline ── */
        .rfm-timeline { position: relative; padding: 0 0 20px; }

        /* Track (always visible faint line) */
        .rfm-timeline-track {
          position: absolute;
          left: 50%; transform: translateX(-50%);
          top: 0; bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.05);
          pointer-events: none;
        }

        /* Animated progress line */
        .rfm-timeline-progress {
          position: absolute;
          left: 50%; transform: translateX(-50%);
          top: 0;
          width: 2px;
          background: linear-gradient(to bottom,
            rgba(0,212,255,0.9),
            rgba(124,58,237,0.85),
            rgba(245,158,11,0.6)
          );
          pointer-events: none;
          transition: height 0.08s linear;
          /* Glow effect */
          box-shadow: 0 0 8px rgba(0,212,255,0.5), 0 0 20px rgba(0,212,255,0.15);
        }

        /* Glowing tip at bottom of progress line */
        .rfm-timeline-progress::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%; transform: translateX(-50%);
          width: 10px; height: 10px; border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 0 4px rgba(0,212,255,0.2), 0 0 18px rgba(0,212,255,0.6);
        }

        .rfm-timeline-items {
          display: flex; flex-direction: column; gap: 56px; position: relative; z-index: 2;
        }

        /* Desktop row layout */
        .rfm-timeline-row {
          display: grid;
          grid-template-columns: 1fr 60px 1fr;
          align-items: center;
        }

        /* Card slide-in transitions */
        .rfm-card-animate {
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .rfm-card-animate.hidden-left {
          opacity: 0;
          transform: translateX(-40px);
        }
        .rfm-card-animate.hidden-right {
          opacity: 0;
          transform: translateX(40px);
        }
        .rfm-card-animate.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .rfm-timeline-dot-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .rfm-timeline-dot {
          width: 14px; height: 14px; border-radius: 50%;
          background: #00d4ff;
          box-shadow: 0 0 0 4px rgba(0,212,255,0.15), 0 0 14px rgba(0,212,255,0.4);
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 3;
          position: relative;
        }
        .rfm-timeline-dot.dot-active {
          transform: scale(1.3);
          box-shadow: 0 0 0 6px rgba(0,212,255,0.2), 0 0 24px rgba(0,212,255,0.6);
        }

        .rfm-timeline-slot {
          display: flex;
        }
        .rfm-timeline-slot.slot-left { justify-content: flex-end; }
        .rfm-timeline-slot.slot-right { justify-content: flex-start; }

        .rfm-exp-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .rfm-exp-card:hover {
          border-color: rgba(0,212,255,0.35);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,212,255,0.08);
        }

        .rfm-exp-position {
          font-family: 'Orbitron', monospace;
          font-size: 15px; font-weight: 700;
          color: #dde8f8; margin: 0 0 5px;
        }
        .rfm-exp-company {
          font-size: 14px; font-weight: 600;
          color: #00d4ff; margin: 0 0 8px;
        }
        .rfm-exp-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .rfm-badge-type {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: rgba(0,212,255,0.1);
          border: 1px solid rgba(0,212,255,0.2);
          color: #00d4ff;
        }
        .rfm-badge-period {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.2);
          color: #a78bfa;
        }
        .rfm-exp-location {
          font-size: 12px; color: rgba(255,255,255,0.3); margin: 0 0 12px;
        }
        .rfm-exp-desc {
          list-style: none; padding: 0; margin: 0 0 14px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .rfm-exp-desc li {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.65;
        }
        .rfm-exp-desc li::before { content: "▸"; color: #00d4ff; font-size: 10px; margin-top: 3px; flex-shrink: 0; }

        .rfm-tech-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .rfm-tech-chip {
          padding: 3px 10px; border-radius: 6px;
          font-size: 11px; font-weight: 600;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,212,255,0.12);
          color: rgba(255,255,255,0.52);
          transition: all 0.2s;
        }
        .rfm-tech-chip:hover {
          background: rgba(0,212,255,0.08);
          color: rgba(255,255,255,0.8);
          border-color: rgba(0,212,255,0.3);
        }
        .rfm-exp-icon-wrap {
          width: 42px; height: 42px; border-radius: 10px;
          background: linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15));
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; flex-shrink: 0;
        }

        /* ── Projects Grid ── */
        .rfm-proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }
        .rfm-proj-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 16px; overflow: hidden;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .rfm-proj-card:hover {
          border-color: rgba(0,212,255,0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(0,212,255,0.08);
        }
        .rfm-proj-thumb {
          height: 160px;
          background: linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.12) 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 40px; border-bottom: 1px solid rgba(0,212,255,0.08);
        }
        .rfm-proj-body { padding: 20px; }
        .rfm-proj-meta {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;
        }
        .rfm-proj-cat {
          padding: 3px 10px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          background: rgba(0,212,255,0.1);
          border: 1px solid rgba(0,212,255,0.2);
          color: #00d4ff;
        }
        .rfm-proj-year { font-size: 12px; color: rgba(255,255,255,0.28); }
        .rfm-proj-title {
          font-family: 'Orbitron', monospace;
          font-size: 15px; font-weight: 700;
          color: #dde8f8; margin: 0 0 8px;
        }
        .rfm-proj-desc {
          font-size: 13px; color: rgba(255,255,255,0.42);
          line-height: 1.7; margin: 0 0 12px;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .rfm-proj-highlights {
          list-style: none; padding: 0; margin: 0 0 12px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .rfm-proj-highlights li {
          display: flex; align-items: flex-start; gap: 6px;
          font-size: 12px; color: rgba(255,255,255,0.38);
        }
        .rfm-proj-highlights li::before { content: "•"; color: #00d4ff; flex-shrink: 0; }
        .rfm-proj-links { display: flex; gap: 16px; margin-top: 14px; }
        .rfm-proj-link {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-decoration: none; transition: color 0.2s;
        }
        .rfm-proj-link:hover { color: #00d4ff; }

        /* ── Mobile Responsive ── */
        @media (max-width: 860px) {
          .rfm-timeline-track,
          .rfm-timeline-progress { display: none; }

          /* Switch to single-column centered */
          .rfm-timeline-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }

          .rfm-timeline-slot {
            width: 100%;
            justify-content: center !important;
          }

          .rfm-timeline-dot-wrap {
            width: 100%;
            padding: 16px 0;
            position: relative;
          }

          /* Mobile connector line between cards */
          .rfm-timeline-dot-wrap::before {
            content: '';
            position: absolute;
            top: 0; bottom: 0;
            left: 50%; transform: translateX(-50%);
            width: 2px;
            background: linear-gradient(to bottom, rgba(0,212,255,0.3), rgba(124,58,237,0.3));
          }

          .rfm-exp-card {
            max-width: 100% !important;
          }

          .rfm-card-animate.hidden-left,
          .rfm-card-animate.hidden-right {
            opacity: 0;
            transform: translateY(24px);
          }
          .rfm-card-animate.visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <section id="experience" className="rfm-exp">
        <div className="rfm-exp-inner">
          {/* Header */}
          <div className="rfm-exp-header">
            <div className="rfm-section-label">{t.experience.label}</div>
            <h2 className="rfm-exp-title">{t.experience.title}</h2>
            <p className="rfm-exp-subtitle">{t.experience.subtitle}</p>
          </div>

          {/* Toggle */}
          <div className="rfm-toggle-wrap">
            <div className="rfm-toggle">
              {(["experience", "projects"] as ViewType[]).map((v) => (
                <button
                  key={v}
                  className={`rfm-toggle-btn ${activeView === v ? "rfm-toggle-active" : "rfm-toggle-idle"}`}
                  onClick={() => {
                    setActiveView(v);
                    if (v === "experience")
                      setProjectFilter(t.experience.projects.categories[0]);
                  }}
                >
                  {v === "experience"
                    ? t.experience.toggleExp
                    : t.experience.toggleProj}
                </button>
              ))}
            </div>
          </div>

          {/* ── Experience Timeline ── */}
          {activeView === "experience" && (
            <div className="rfm-timeline" ref={timelineRef}>
              {/* Static track */}
              <div className="rfm-timeline-track" />

              {/* Animated progress line */}
              <div
                className="rfm-timeline-progress"
                style={{
                  height: `${lineProgress * 100}%`,
                }}
              />

              <div className="rfm-timeline-items">
                {experiences.map((exp, index) => {
                  const isLeft = index % 2 === 0;
                  return <TimelineRow key={exp.id} exp={exp} isLeft={isLeft} />;
                })}
              </div>
            </div>
          )}

          {/* ── Projects ── */}
          {activeView === "projects" && (
            <>
              <div className="rfm-filter-row">
                {t.experience.projects.categories.map((cat) => (
                  <button
                    key={cat}
                    className={`rfm-filter-chip ${projectFilter === cat || (projectFilter === "All" && cat === t.experience.projects.categories[0]) ? "rfm-filter-active" : "rfm-filter-idle"}`}
                    onClick={() => setProjectFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="rfm-proj-grid">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="rfm-proj-card">
                    <div className="rfm-proj-thumb">💻</div>
                    <div className="rfm-proj-body">
                      <div className="rfm-proj-meta">
                        <span className="rfm-proj-cat">{proj.category}</span>
                        <span className="rfm-proj-year">{proj.year}</span>
                      </div>
                      <h3 className="rfm-proj-title">{proj.title}</h3>
                      <p className="rfm-proj-desc">{proj.description}</p>
                      <ul className="rfm-proj-highlights">
                        {proj.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      <div className="rfm-tech-chips">
                        {proj.tech.slice(0, 4).map((t) => (
                          <span key={t} className="rfm-tech-chip">
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 4 && (
                          <span
                            className="rfm-tech-chip"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                          >
                            +{proj.tech.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="rfm-proj-links">
                        {proj.github && (
                          <a
                            href={proj.github}
                            className="rfm-proj-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.experience.projects.btnCode}
                          </a>
                        )}
                        {proj.live && (
                          <a
                            href={proj.live}
                            className="rfm-proj-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {t.experience.projects.btnLive}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

/* ── Timeline Row with scroll reveal ── */
function TimelineRow({ exp, isLeft }: { exp: Experience; isLeft: boolean }) {
  const { ref, visible } = useRevealOnScroll();

  return (
    <div className="rfm-timeline-row" ref={ref}>
      {/* Left slot */}
      <div className="rfm-timeline-slot slot-left">
        {isLeft && (
          <div
            className={`rfm-card-animate ${visible ? "visible" : "hidden-left"}`}
            style={{ width: "100%", maxWidth: 420 }}
          >
            <div className="rfm-exp-card">
              <ExpCard exp={exp} />
            </div>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="rfm-timeline-dot-wrap">
        <div className={`rfm-timeline-dot ${visible ? "dot-active" : ""}`} />
      </div>

      {/* Right slot */}
      <div className="rfm-timeline-slot slot-right">
        {!isLeft && (
          <div
            className={`rfm-card-animate ${visible ? "visible" : "hidden-right"}`}
            style={{ width: "100%", maxWidth: 420 }}
          >
            <div className="rfm-exp-card">
              <ExpCard exp={exp} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-component ── */
function ExpCard({ exp }: { exp: Experience }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 className="rfm-exp-position">{exp.position}</h3>
          <p className="rfm-exp-company">{exp.company}</p>
          <div className="rfm-exp-badges">
            <span className="rfm-badge-type">{exp.type}</span>
            <span className="rfm-badge-period">{exp.period}</span>
          </div>
        </div>
        <div className="rfm-exp-icon-wrap">💼</div>
      </div>
      <p className="rfm-exp-location">📍 {exp.location}</p>
      <ul className="rfm-exp-desc">
        {exp.description.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
      <div className="rfm-tech-chips">
        {exp.tech.map((t) => (
          <span key={t} className="rfm-tech-chip">
            {t}
          </span>
        ))}
      </div>
    </>
  );
}
