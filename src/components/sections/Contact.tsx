"use client";

import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

/* ────────────────────────────────────────────
   Contact Component
──────────────────────────────────────────── */
export const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const contactInfo = [
    {
      icon: "✉️",
      label: "Email",
      value: "rizalfikrim13@gmail.com",
      href: "mailto:rizalfikrim13@gmail.com",
    },
    // {
    //   icon: "📱",
    //   label: "Phone",
    //   value: "+62 812-3456-7890",
    //   href: "https://wa.me/6281234567890",
    // },
    {
      icon: "📍",
      label: "Location",
      value: "Bogor, West Java, Indonesia",
      href: "#",
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/rizalfikrimulyana",
      href: "https://linkedin.com/in/rizalfikrimulyana",
    },
  ];

  const socialLinks = [
    { label: "GH", href: "https://github.com/rizalfikrim", title: "GitHub" },
    {
      label: "IN",
      href: "https://linkedin.com/in/rizalfikrimulyana",
      title: "LinkedIn",
    },
    {
      label: "IG",
      href: "https://instagram.com/rizalfikrimulyana",
      title: "Instagram",
    },
    { label: "@", href: "https://twitter.com/rizalfikrimulyana", title: "Twitter" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&display=swap');

        .rfm-contact {
          background:
            radial-gradient(ellipse 80% 60% at 10% 60%, rgba(0,180,216,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 90% 30%, rgba(124,58,237,0.09) 0%, transparent 55%),
            #020210;
          padding: 100px 0;
          font-family: 'Rajdhani', 'Segoe UI', sans-serif;
          position: relative; overflow: hidden;
        }

        .rfm-contact-bg {
          position: absolute; inset: 0; opacity: 0.04;
          pointer-events: none;
        }

        .rfm-contact-inner {
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(20px, 4vw, 52px);
          position: relative; z-index: 2;
        }

        .rfm-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
        }

        .rfm-contact-left { display: flex; flex-direction: column; gap: 32px; }

        .rfm-section-label {
          display: inline-flex; align-items: center; gap: 9px;
          background: rgba(0,212,255,0.07);
          border: 1px solid rgba(0,212,255,0.22);
          border-radius: 100px; padding: 7px 18px;
          font-family: 'Orbitron', monospace; font-size: 10px; font-weight: 700;
          letter-spacing: 2.5px; color: #00d4ff; margin-bottom: 20px;
        }

        .rfm-contact-title {
          font-family: 'Orbitron', monospace;
          font-size: clamp(26px, 3vw, 40px); font-weight: 900;
          color: #dde8f8; margin: 0 0 12px; line-height: 1.2;
        }

        .rfm-contact-subtitle {
          color: rgba(255,255,255,0.38); font-size: 15px; line-height: 1.8; margin: 0;
        }

        .rfm-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        .rfm-info-card {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 12px;
          text-decoration: none;
          transition: border-color 0.25s, background 0.25s, transform 0.22s;
        }
        .rfm-info-card:hover {
          border-color: rgba(0,212,255,0.3);
          background: rgba(0,212,255,0.04);
          transform: translateX(4px);
        }

        .rfm-info-icon { font-size: 18px; flex-shrink: 0; }

        .rfm-info-label {
          font-size: 11px; color: rgba(255,255,255,0.3);
          letter-spacing: 0.5px; margin: 0 0 2px;
        }
        .rfm-info-value {
          font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.78); margin: 0;
          transition: color 0.2s;
        }
        .rfm-info-card:hover .rfm-info-value { color: #00d4ff; }

        .rfm-social-title {
          font-family: 'Orbitron', monospace;
          font-size: 14px; font-weight: 700; color: #dde8f8;
          margin: 0 0 14px;
        }
        .rfm-social-row { display: flex; gap: 10px; }
        .rfm-soc {
          width: 46px; height: 46px; border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 700;
          color: rgba(255,255,255,0.38);
          transition: all 0.22s;
        }
        .rfm-soc:hover {
          background: rgba(0,212,255,0.1);
          border-color: rgba(0,212,255,0.38);
          color: #00d4ff;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,212,255,0.15);
        }

        .rfm-avail {
          display: flex; align-items: center; gap: 10px;
          color: #4ade80; font-size: 14px; font-weight: 600;
        }
        .rfm-avail-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #4ade80; flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
          animation: rfm-dotPulse 2s infinite;
        }
        @keyframes rfm-dotPulse {
          0%  { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100%{ box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }

        .rfm-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,212,255,0.1);
          border-radius: 20px;
          padding: clamp(24px, 4vw, 40px);
        }

        .rfm-form-title {
          font-family: 'Orbitron', monospace;
          font-size: 20px; font-weight: 700; color: #dde8f8;
          margin: 0 0 28px;
        }

        .rfm-form { display: flex; flex-direction: column; gap: 18px; }

        .rfm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .rfm-field { display: flex; flex-direction: column; gap: 7px; }

        .rfm-label {
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.5); letter-spacing: 0.5px;
        }

        .rfm-input, .rfm-textarea {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,212,255,0.12);
          border-radius: 10px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px; color: rgba(255,255,255,0.85);
          outline: none;
          transition: border-color 0.22s, background 0.22s;
          box-sizing: border-box;
        }
        .rfm-input::placeholder, .rfm-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .rfm-input:focus, .rfm-textarea:focus {
          border-color: rgba(0,212,255,0.4);
          background: rgba(0,212,255,0.04);
        }

        .rfm-textarea { resize: none; min-height: 120px; }

        .rfm-submit {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
          border: none; border-radius: 10px;
          font-family: 'Orbitron', monospace; font-size: 11px; font-weight: 700;
          letter-spacing: 2px; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: opacity 0.22s, transform 0.22s;
        }
        .rfm-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .rfm-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .rfm-spinner {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          animation: rfm-spin 0.7s linear infinite;
        }
        @keyframes rfm-spin { to { transform: rotate(360deg); } }

        .rfm-error-msg { font-size: 13px; color: #f87171; text-align: center; margin: 0; }

        @media (max-width: 860px) {
          .rfm-contact-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .rfm-info-grid { grid-template-columns: 1fr; }
          .rfm-form-row  { grid-template-columns: 1fr; }
        }
      `}</style>

      <section id="contact" className="rfm-contact">
        <svg className="rfm-contact-bg" width="100%" height="100%">
          <defs>
            <pattern
              id="rfm-circuit"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10 L90 10 M50 10 L50 90 M10 50 L90 50"
                stroke="white"
                strokeWidth="0.6"
                fill="none"
              />
              <circle cx="10" cy="10" r="2" fill="white" />
              <circle cx="90" cy="10" r="2" fill="white" />
              <circle cx="50" cy="90" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rfm-circuit)" />
        </svg>

        <div className="rfm-contact-inner">
          <div className="rfm-contact-grid">
            <div className="rfm-contact-left">
              <div>
                <div className="rfm-section-label">{t.contact.label}</div>
                <h2 className="rfm-contact-title">
                  {t.contact.title}
                </h2>
                <p className="rfm-contact-subtitle">
                  {t.contact.subtitle}
                </p>
              </div>

              <div className="rfm-info-grid">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="rfm-info-card"
                  >
                    <span className="rfm-info-icon">{info.icon}</span>
                    <div>
                      <p className="rfm-info-label">
                        {info.label.toUpperCase()}
                      </p>
                      <p className="rfm-info-value">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <p className="rfm-social-title">{t.contact.follow}</p>
                <div className="rfm-social-row">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.title}
                      className="rfm-soc"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rfm-avail">
                <div className="rfm-avail-dot" />
                <span>
                  {t.contact.available}
                </span>
              </div>
            </div>

            <div className="rfm-form-card">
              <h3 className="rfm-form-title">{t.contact.formTitle}</h3>

              <form className="rfm-form" onSubmit={handleSubmit}>
                <div className="rfm-form-row">
                  <div className="rfm-field">
                    <label className="rfm-label" htmlFor="name">
                      {t.contact.form.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="rfm-input"
                      placeholder={t.contact.placeholders.name}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="rfm-field">
                    <label className="rfm-label" htmlFor="email">
                      {t.contact.form.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="rfm-input"
                      placeholder={t.contact.placeholders.email}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="rfm-field">
                  <label className="rfm-label" htmlFor="subject">
                    {t.contact.form.subject}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="rfm-input"
                    placeholder={t.contact.placeholders.subject}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="rfm-field">
                  <label className="rfm-label" htmlFor="message">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="rfm-textarea"
                    placeholder={t.contact.placeholders.message}
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                  />
                </div>

                <button
                  type="submit"
                  className="rfm-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="rfm-spinner" /> {t.contact.sending}
                    </>
                  ) : submitStatus === "success" ? (
                    <>{t.contact.sent}</>
                  ) : (
                    <>{t.contact.send}</>
                  )}
                </button>

                {submitStatus === "error" && (
                  <p className="rfm-error-msg">
                    {t.contact.error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
