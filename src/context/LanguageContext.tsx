"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { en } from "../locales/en";
import { id } from "../locales/id";

type Language = "en" | "id";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("id"); // Default to ID based on previous context
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const savedLang = localStorage.getItem("rfm-lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "id")) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const nextLang = prev === "en" ? "id" : "en";
      localStorage.setItem("rfm-lang", nextLang);
      return nextLang;
    });
  };

  const t = language === "en" ? en : id;

  // Render children and always provide context so hooks don't crash during SSR
  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
