import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home.js';
import RouteDetails from './screens/RouteDetails.js';
import LanguageScreen from './components/LanguageScreen';
import { LanguageProvider } from './context/LanguageContext';
import { useTranslation } from 'react-i18next';

const Drawer = createDrawerNavigator();

export default function App(){
  const { t } = useTranslation();
  return (
    <LanguageProvider>
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ backgroundColor: '#FFC75B' }} // Set background color for the drawer
        screenOptions={{
          headerShown: false, // Hide the drawer header text
        }}
      >
        <Drawer.Screen name="RouteDetails" component={RouteDetails} />
        <Drawer.Screen name={t('home')} component={Home} />
        <Drawer.Screen name="Change Language" component={LanguageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
    </LanguageProvider>
  );
};
