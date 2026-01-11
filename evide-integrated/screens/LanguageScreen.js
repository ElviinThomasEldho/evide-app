import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import Button from '../components/UI/Button';

/**
 * Language selection screen
 * Allows users to switch between supported languages
 */
const LanguageScreen = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const handleLanguageChange = useCallback((lang) => {
    changeLanguage(lang);
  }, [changeLanguage]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('selectLanguage') || 'Select Language'}</Text>
        <Text style={styles.subtitle}>
          {t('currentLanguage') || 'Current Language'}: {language === 'en' ? 'English' : 'Malayalam'}
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            title="English" 
            onPress={() => handleLanguageChange('en')}
            variant={language === 'en' ? 'primary' : 'outline'}
            style={styles.button}
          />
          <Button 
            title="മലയാളം (Malayalam)" 
            onPress={() => handleLanguageChange('mal')}
            variant={language === 'mal' ? 'primary' : 'outline'}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  button: {
    width: '100%',
  },
});

export default React.memo(LanguageScreen);