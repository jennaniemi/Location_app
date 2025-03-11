import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function LocationsList({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        setLocations(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching locations: ", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add New Location" onPress={() => navigation.navigate("AddLocation")} />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.locationItem}
            onPress={() => navigation.navigate("MapViewScreen", { location: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>⭐ {item.rating} Stars</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  locationItem: { padding: 15, marginVertical: 10, backgroundColor: "#ddd", borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
});
