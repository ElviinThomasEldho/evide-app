// LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const LanguageContext = createContext();

// Initialize i18next once
if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v3',
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: {
          translation: require('../locales/en.json'),
        },
        mal: {
          translation: require('../locales/mal.json'),
        },
      },
    });
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);