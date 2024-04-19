import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home.js';
import ViewRoutes from './screens/ViewRoutes.js';
import RoutePanel from './components/RoutePanel.js';
import RouteDetailsScreen from './screens/RouteDetails.js';
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
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="View Routes" component={ViewRoutes} />
        <Drawer.Screen name="Route Details" component={RouteDetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
