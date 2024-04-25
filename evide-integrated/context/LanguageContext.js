// LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18next
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v3',
        lng: language,
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