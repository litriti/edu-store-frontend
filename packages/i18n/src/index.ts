// packages/i18n/index.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/translation.json";
import vi from "./locales/vi/translation.json";

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

// Khởi tạo i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    detection: {
      // Ưu tiên ngôn ngữ lưu ở localStorage, sau đó đến navigator.language
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], // lưu lại vào localStorage
    },
    interpolation: {
      escapeValue: false,
    },
    debug: process.env.NODE_ENV === "development",
  });

export default i18n;
