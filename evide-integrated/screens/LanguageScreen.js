// LanguageScreen.js
import React from 'react';
import { View, Button } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LanguageScreen = () => {
  const { changeLanguage } = useLanguage();

  const changeToEnglish = () => {
    changeLanguage('en');
  };

  const changeToMalayalam = () => {
    changeLanguage('mal');
  };

  return (
    <View>
      <Button title="English" onPress={changeToEnglish} />
      <Button title="Malayalam" onPress={changeToMalayalam} />
      <Button title="English" onPress={changeToEnglish} />
    </View>
  );
};

export default LanguageScreen;