import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { db } from "../firebaseConfig";

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  const fetchLocations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "locations"));
      setLocations(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLocations();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Button title="Add New Location" onPress={() => navigation.navigate("AddLocation")} />
      
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  locationItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: 15, 
    marginVertical: 10, 
    backgroundColor: "#ddd", 
    borderRadius: 10 
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: "bold" },
  pinButton: { padding: 10 }
});
