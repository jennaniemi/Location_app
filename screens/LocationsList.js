import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore
import { useFocusEffect } from "@react-navigation/native"; // Detects when screen is focused
import { FontAwesome5 } from "@expo/vector-icons"; //Icon map for marker
import { db } from "../firebaseConfig"; // Firebase config

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

    // Function to fetch locations from Firestore
  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      setLocations(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };

   // Refresh the list when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [])
  );

   // Remove the default back button from the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Button to navigate to the Add Location screen */}
      <Button title="Add New Location" onPress={() => navigation.navigate("AddLocation")} />
      
       {/* Navigate to MapViewScreen when marker icon is pressed */}
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>⭐ {item.rating} Stars</Text>
            </View>

             {/* Navigate to MapViewScreen when marker icon is pressed */}
            <TouchableOpacity
              onPress={() => navigation.navigate("MapViewScreen", { location: item })}
              style={styles.pinButton}
            >
              <FontAwesome5 name="map-marker-alt" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Styling
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#333", },
  locationItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: 15, 
    marginVertical: 10, 
    backgroundColor: "#6a6a6a", 
    borderRadius: 10 
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold" },
  pinButton: { padding: 10 }
});
