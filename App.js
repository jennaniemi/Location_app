import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import screen components
import LocationsList from './screens/LocationsList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocationsList" screenOptions={{
          headerStyle: { backgroundColor: "#222" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}>
            {/* Home screen displaying a list of locations */}
        <Stack.Screen name="LocationsList"
        component={LocationsList}
        options={{ title: "Locations"}}
        />
         {/* Screen for adding a new location */}
        <Stack.Screen name="AddLocation"
        component={AddLocation}
        options={{ title: "Add Location"}}
        />
        {/* Screen displaying your location on a map */}
        <Stack.Screen name="MapViewScreen"
        component={MapViewScreen}
        options={{ title: "The Map"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
