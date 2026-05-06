"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";

const CONTACT_INFO = [
  {
    label: "Email",
    value: "rizalfikrim13@gmail.com",
    href: "mailto:rizalfikrim13@gmail.com",
    icon: FiMail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rizalfikrimulyana",
    href: "https://linkedin.com/in/rizalfikrimulyana",
    icon: FiLinkedin,
  },
  {
    label: "GitHub",
    value: "github.com/rizalfikrim",
    href: "https://github.com/rizalfikrim",
    icon: FiGithub,
  },
];

const SOCIAL_LINKS = [
  { icon: FiGithub, href: "https://github.com/rizalfikrim", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/rizalfikrimulyana",
    label: "LinkedIn",
  },
  { icon: FiMail, href: "mailto:rizalfikrim13@gmail.com", label: "Email" },
];

export const Footer = () => {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Gradient Separator */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(0, 212, 255, 0.3), transparent)",
        }}
      />

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0a0a1f",
          borderTop: "1px solid rgba(0, 212, 255, 0.1)",
          padding: "3rem 1rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "50%",
              background:
                "linear-gradient(to bottom right, rgba(0, 212, 255, 0.8), transparent)",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "50%",
              height: "50%",
              background:
                "linear-gradient(to top left, rgba(124, 58, 237, 0.8), transparent)",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Main Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: !isMobile ? "repeat(3, 1fr)" : "1fr",
              gap: "2rem 3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Column 1: Logo & Tagline */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: "bold",
                    fontFamily: "'Orbitron', monospace",
                    background: "linear-gradient(to right, #00d4ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  RF.
                </div>
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.4)",
                  marginBottom: "24px",
                  lineHeight: "1.6",
                }}
              >
                {t.hero.bio}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#dde8f8", fontFamily: "'Orbitron', monospace" }}>
                Quick Links
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a href="#home" style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#00d4ff")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}>
                  {t.nav.home}
                </a>
                <a href="#about" style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#00d4ff")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}>
                  {t.nav.about}
                </a>
                <a href="#experience" style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.color = "#00d4ff")} onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)")}>
                  {t.nav.experience}
                </a>
              </div>
            </div>

            {/* Column 3: Contact Info */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: "bold",
                  color: "#00d4ff",
                }}
              >
                Contact
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {CONTACT_INFO.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.href}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        textDecoration: "none",
                        transition: "color 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00d4ff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                      }}
                    >
                      <Icon style={{ width: "1rem", height: "1rem" }} />
                      {info.value}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(0, 212, 255, 0.2), transparent)",
              marginBottom: "1.5rem",
            }}
          />

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              flexDirection: !isMobile ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          >
            {/* Social Links */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(0, 212, 255, 0.3)",
                      color: "#00d4ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.1)";
                      e.currentTarget.style.borderColor = "rgb(0, 212, 255)";
                      e.currentTarget.style.boxShadow =
                        "0 0 15px rgba(0, 212, 255, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.borderColor =
                        "rgba(0, 212, 255, 0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Icon style={{ width: "1.25rem", height: "1.25rem" }} />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <p
              style={{
                fontSize: "0.75rem",
                color: "#94a3b8",
                textAlign: isMobile ? "center" : "right",
              }}
            >
              © {new Date().getFullYear()} Rizal Fikri Mulyana. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 40,
              width: "3rem",
              height: "3rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(to right, #00d4ff, #7c3aed)",
              border: "none",
              color: "#050510",
              fontWeight: "bold",
              fontSize: "1.125rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          >
            <FiArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
