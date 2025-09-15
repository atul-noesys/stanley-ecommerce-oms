"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<"en" | "zh">("en");

  useEffect(() => {
    // Set initial state from i18next or localStorage
    const stored = localStorage.getItem("i18nextLng") as "en" | "zh" | null;
    const initialLang = stored || "en";
    setLang(initialLang);
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "zh" : "en";
    setLang(newLang);
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <div
      className="relative w-20 h-10 bg-gray-200 rounded-full p-1 cursor-pointer flex items-center"
      onClick={toggleLanguage}
    >
      <div
        className={`absolute top-1 left-1 w-8 h-8 bg-black rounded-full shadow-md transform transition-transform duration-300 ${
          lang === "zh" ? "translate-x-10" : "translate-x-0"
        }`}
      />
      <div className="absolute inset-0 flex justify-between items-center px-2 text-sm font-medium pointer-events-none">
        <span
          className={`ml-1 transition-colors duration-300 ${lang === "en" ? "text-white" : "text-gray-500"}`}
        >
          EN
        </span>
        <span
          className={`transition-colors duration-300 ${lang === "zh" ? "text-white" : "text-gray-500"}`}
        >
          中文
        </span>
      </div>
    </div>
  );
}
