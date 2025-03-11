import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LocationsList from './screens/LocationsList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocationsList">
        <Stack.Screen name="LocationsList" component={LocationsList} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

