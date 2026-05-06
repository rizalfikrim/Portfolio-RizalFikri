"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLanguage } from "../../context/LanguageContext";

const NAV_KEYS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "certificates", href: "#certificates" },
  { key: "skills", href: "#skills" },
  { key: "contact", href: "#contact" },
] as const;

export const Navbar = () => {
  const { language, t, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const { scrollProgress } = useScrollProgress();

  // Detect window size on client
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Call once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleIntersection = () => {
      const sections = NAV_KEYS.map((link) => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleIntersection);
    return () => window.removeEventListener("scroll", handleIntersection);
  }, []);

  const handleLinkClick = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${scrollProgress * 100}%`,
          background: "linear-gradient(to right, #00d4ff, #7c3aed, #00d4ff)",
          zIndex: 999,
          transition: "width 0.1s ease",
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "1rem",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          backgroundColor: isScrolled ? "rgba(5, 5, 16, 0.8)" : "transparent",
          borderBottom: isScrolled
            ? "1px solid rgba(0, 212, 255, 0.2)"
            : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleLinkClick("#home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              fontSize: "1.5rem",
              fontWeight: "bold",
              fontFamily: "'Orbitron', monospace",
              background: "linear-gradient(to right, #00d4ff, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                backgroundColor: "#00d4ff",
                boxShadow: "0 0 8px rgba(0, 212, 255, 1)",
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div
            style={{
              display: !isMobile ? "flex" : "none",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            {NAV_KEYS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "'Syne', sans-serif",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color:
                    activeLink === link.href.substring(1)
                      ? "#00d4ff"
                      : "#94a3b8",
                  padding: "0.5rem 0",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (activeLink !== link.href.substring(1)) {
                    e.currentTarget.style.color = "#e2e8f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLink !== link.href.substring(1)) {
                    e.currentTarget.style.color = "#94a3b8";
                  }
                }}
              >
                {t.nav[link.key]}
                {activeLink === link.href.substring(1) && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-0.5rem",
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(to right, #00d4ff, #7c3aed)",
                      borderRadius: "1px",
                    }}
                  />
                )}
              </button>
            ))}

            {/* Language Toggle Desktop */}
            <button
              onClick={toggleLanguage}
              style={{
                position: "relative",
                width: "56px",
                height: "28px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "6px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: language === "en" ? "rgba(255,255,255,0.4)" : "#fff",
                  fontFamily: "'Orbitron', monospace",
                  zIndex: 1,
                  transition: "color 0.3s ease"
                }}
              >ID</div>
              <div
                style={{
                  position: "absolute",
                  right: "6px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: language === "en" ? "#fff" : "rgba(255,255,255,0.4)",
                  fontFamily: "'Orbitron', monospace",
                  zIndex: 1,
                  transition: "color 0.3s ease"
                }}
              >EN</div>
              <motion.div
                initial={false}
                animate={{
                  x: language === "en" ? 28 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "11px",
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                  zIndex: 2,
                }}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: isMobile ? "flex" : "none",
              flexDirection: "column",
              gap: "0.375rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "1.5rem",
                  height: "2px",
                  backgroundColor: "#00d4ff",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                  transform:
                    isOpen && i === 0
                      ? "translateY(9px) rotate(45deg)"
                      : isOpen && i === 1
                        ? "scaleX(0)"
                        : isOpen && i === 2
                          ? "translateY(-9px) rotate(-45deg)"
                          : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor: "rgba(5, 5, 16, 0.95)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {NAV_KEYS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  fontSize: "1.875rem",
                  fontFamily: "'Orbitron', monospace",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color:
                    activeLink === link.href.substring(1)
                      ? "#00d4ff"
                      : "#94a3b8",
                  transition: "all 0.3s ease",
                }}
              >
                {t.nav[link.key]}
              </motion.button>
            ))}

            {/* Language Toggle Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_KEYS.length * 0.1 }}
              style={{ marginTop: "2rem" }}
            >
              <button
                onClick={toggleLanguage}
                style={{
                  position: "relative",
                  width: "72px",
                  height: "36px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: language === "en" ? "rgba(255,255,255,0.4)" : "#fff",
                    fontFamily: "'Orbitron', monospace",
                    zIndex: 1,
                    transition: "color 0.3s ease"
                  }}
                >ID</div>
                <div
                  style={{
                    position: "absolute",
                    right: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: language === "en" ? "#fff" : "rgba(255,255,255,0.4)",
                    fontFamily: "'Orbitron', monospace",
                    zIndex: 1,
                    transition: "color 0.3s ease"
                  }}
                >EN</div>
                <motion.div
                  initial={false}
                  animate={{
                    x: language === "en" ? 36 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "13px",
                    background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                    boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                    zIndex: 2,
                  }}
                />
              </button>
            </motion.div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "1.875rem",
                color: "#00d4ff",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
