"use client";

import { useLanguage } from "../../context/LanguageContext";

/* ── Stub types — replace with your real import ── */
interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  credentialId?: string;
}

const certificates: Certificate[] = [
  { id: "1", title: "BNSP Certification", issuer: "BNSP", date: "N/A", category: "Professional" },
  { id: "2", title: "The Basic Of Google Cloud Compute Skill Badge", issuer: "Google Cloud", date: "N/A", category: "Training" },
  { id: "3", title: "IAI Indonesia Certification", issuer: "IAI Indonesia", date: "N/A", category: "Professional" },
  { id: "4", title: "TOEFL Prediction Test", issuer: "N/A", date: "N/A", category: "Language" },
  { id: "5", title: "Web Developer Internship Certificate", issuer: "PT Wavetek Integra Nusa", date: "N/A", category: "Experience" },
  { id: "6", title: "Software Development Bootcamp", issuer: "N/A", date: "N/A", category: "Training" },
  { id: "7", title: "Machine Learning Bootcamp", issuer: "N/A", date: "N/A", category: "Training" },
  { id: "8", title: "Data Analyst Bootcamp", issuer: "N/A", date: "N/A", category: "Training" },
  { id: "9", title: "Frontend Development - Dicoding", issuer: "Dicoding", date: "N/A", category: "Technical" },
  { id: "10", title: "Flutter Coding Camp", issuer: "N/A", date: "N/A", category: "Technical" },
  { id: "11", title: "Data Analysis with Excel", issuer: "N/A", date: "N/A", category: "Technical" },
  { id: "12", title: "Data Analysis with SQL & Python", issuer: "N/A", date: "N/A", category: "Technical" },
  { id: "13", title: "Belajar Basic AI - Dicoding", issuer: "Dicoding", date: "N/A", category: "Technical" }
];

const categoryGradients: Record<string, { from: string; to: string; accent: string }> = {
  Professional: { from: "#0ea5e9", to: "#06b6d4", accent: "rgba(14,165,233,0.12)" },
  Training: { from: "#00d4ff", to: "#7c3aed", accent: "rgba(0,212,255,0.12)" },
  Language: { from: "#10b981", to: "#059669", accent: "rgba(16,185,129,0.12)" },
  Experience: { from: "#ef4444", to: "#ec4899", accent: "rgba(239,68,68,0.12)" },
  Technical: { from: "#8b5cf6", to: "#6366f1", accent: "rgba(139,92,246,0.12)" },
};

const categoryIcons: Record<string, string> = {
  Professional: "🏆",
  Training: "📚",
  Language: "🗣️",
  Experience: "💼",
  Technical: "💻",
};

/* ────────────────────────────────────────────
   Certificates Component
──────────────────────────────────────────── */
export const Certificates = () => {
  const { t } = useLanguage();
  const totalIssuers = new Set(certificates.map((c) => c.issuer)).size;
  const totalCats = new Set(certificates.map((c) => c.category)).size;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-certs {
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 20% 90%, rgba(0,180,216,0.07) 0%, transparent 55%),
            #020210;
          padding: 100px 0;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
        }

        .rfm-certs-inner {
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
        }

        .rfm-certs-header { text-align: center; margin-bottom: 56px; }

        .rfm-section-label {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px; padding: 7px 18px;
          font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #00d4ff; margin-bottom: 20px;
        }

        .rfm-certs-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(28px, 3.5vw, 46px);
          font-weight: 900; color: #dde8f8; margin: 0 0 14px;
        }

        .rfm-certs-subtitle {
          color: rgba(255,255,255,0.38); font-size: 15px;
          max-width: 520px; margin: 0 auto; line-height: 1.8;
        }

        /* Cards grid */
        .rfm-cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 56px;
        }

        .rfm-cert-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 16px;
          padding: 22px;
          overflow: hidden;
          transition: border-color 0.25s, transform 0.25s;
        }
        .rfm-cert-card:hover {
          border-color: rgba(0,212,255,0.3);
          transform: translateY(-4px);
        }

        /* Holographic shimmer on hover */
        .rfm-cert-card::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%);
          transform: translateX(-200%);
          transition: transform 0.7s ease;
        }
        .rfm-cert-card:hover::before { transform: translateX(200%); }

        .rfm-cert-top {
          display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 14px;
        }

        .rfm-cert-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }

        .rfm-cert-cat-badge {
          padding: 4px 12px; border-radius: 100px;
          font-size: 11px; font-weight: 700;
          color: #fff; letter-spacing: 0.5px;
        }

        .rfm-cert-name {
          font-family: 'Orbitron', monospace;
          font-size: 14px; font-weight: 700;
          color: #dde8f8; margin: 0 0 6px;
          line-height: 1.4;
        }

        .rfm-cert-issuer {
          font-size: 13px; font-weight: 600;
          color: #00d4ff; margin: 0 0 4px;
        }

        .rfm-cert-date {
          font-size: 12px; color: rgba(255,255,255,0.3);
          margin: 0 0 8px;
        }

        .rfm-cert-id {
          font-size: 10.5px; font-family: 'Orbitron', monospace;
          color: rgba(255,255,255,0.22); margin: 0 0 12px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .rfm-cert-verify {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600;
          color: #00d4ff; background: none; border: none;
          cursor: pointer; padding: 0;
          opacity: 0; transition: opacity 0.22s;
        }
        .rfm-cert-card:hover .rfm-cert-verify { opacity: 1; }
        .rfm-cert-verify:hover { color: #a78bfa; }

        /* Stats row */
        .rfm-cert-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .rfm-cert-stat {
          text-align: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 14px;
          padding: 22px 12px;
          transition: border-color 0.25s;
        }
        .rfm-cert-stat:hover { border-color: rgba(0,212,255,0.25); }

        .rfm-cert-stat-num {
          font-family: 'Orbitron', monospace;
          font-size: 32px; font-weight: 700;
          display: block; margin-bottom: 6px;
        }

        .rfm-cert-stat-lbl {
          font-size: 12px; color: rgba(255,255,255,0.32); letter-spacing: 0.4px;
        }

        @media (max-width: 600px) {
          .rfm-cert-stats { grid-template-columns: 1fr; }
          .rfm-cert-grid  { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="certificates" className="rfm-certs">
        <div className="rfm-certs-inner">
          {/* Header */}
          <div className="rfm-certs-header">
            <div className="rfm-section-label">{t.certificates.label}</div>
            <h2 className="rfm-certs-title">{t.certificates.title}</h2>
            <p className="rfm-certs-subtitle">
              {t.certificates.subtitle}
            </p>
          </div>

          {/* Cards */}
          <div className="rfm-cert-grid">
            {certificates.map((cert) => {
              const colors =
                categoryGradients[cert.category] ??
                categoryGradients.Development;
              const icon = categoryIcons[cert.category] ?? "🏅";
              return (
                <div key={cert.id} className="rfm-cert-card">
                  <div className="rfm-cert-top">
                    <div
                      className="rfm-cert-icon"
                      style={{ background: colors.accent }}
                    >
                      {icon}
                    </div>
                    <span
                      className="rfm-cert-cat-badge"
                      style={{
                        background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      }}
                    >
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="rfm-cert-name">{cert.title}</h3>
                  <p className="rfm-cert-issuer">{cert.issuer}</p>
                  <p className="rfm-cert-date">{cert.date}</p>
                  {cert.credentialId && (
                    <p className="rfm-cert-id">ID: {cert.credentialId}</p>
                  )}
                  <button className="rfm-cert-verify">{t.certificates.btnVerify}</button>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="rfm-cert-stats">
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#00d4ff" }}>
                {certificates.length}
              </span>
              <span className="rfm-cert-stat-lbl">{t.certificates.stats.total}</span>
            </div>
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#a78bfa" }}>
                {totalCats}
              </span>
              <span className="rfm-cert-stat-lbl">{t.certificates.stats.categories}</span>
            </div>
            <div className="rfm-cert-stat">
              <span className="rfm-cert-stat-num" style={{ color: "#f59e0b" }}>
                {totalIssuers}
              </span>
              <span className="rfm-cert-stat-lbl">{t.certificates.stats.issuers}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
