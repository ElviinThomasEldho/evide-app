import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home.js';
import RouteDetails from './screens/RouteDetails.js';

const Drawer = createDrawerNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{ backgroundColor: '#FFC75B' }} // Set background color for the drawer
        screenOptions={{
          headerShown: false, // Hide the drawer header text
        }}
      >
        <Drawer.Screen name="RouteDetails" component={RouteDetails} />
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
