import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LocationsList from './screens/LocationsList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";  // ✅ Make sure you import `db` AFTER it's properly exported

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

// ✅ Ensure Firestore function is correct
const testFirestore = async () => {
  try {
    const locationsRef = collection(db, "locations");  // ✅ Ensure `db` is used correctly
    const querySnapshot = await getDocs(locationsRef);
    
    console.log("🔥 Firestore connected! Found documents:", querySnapshot.docs.length);
  } catch (error) {
    console.error("❌ Firestore error:", error);
  }
};

testFirestore(); // ✅ Run the function to test Firestore
