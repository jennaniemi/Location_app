import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { Rating } from "react-native-ratings";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);

  const handleAddLocation = async () => {
    if (!name || !description || rating === 0) {
      return Alert.alert("Error", "Please fill all fields and give a rating :)");
    }
  
    try {
      await addDoc(collection(db, "locations"), {
        name,
        description,
        rating,
      });
  
      Alert.alert(
        "Success",
        "Location Added!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("LocationsList");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error adding location:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="gray"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="gray"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Rating:</Text>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        onFinishRating={setRating}
        jumpValue={1}
        fractions={0}
        tintColor="black"
        style={{
          backgroundColor: "black",
          borderRadius: 10,
          padding: 10,
        }}
      />

      <View style={{ flexGrow: 1 }} />

      <View style={styles.buttonContainer}>
        <Button title="Add Location" onPress={handleAddLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  input: { width: "100%", borderBottomWidth: 1, marginBottom: 15, padding: 15, fontSize: 16 },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  buttonContainer: {
    width: "100%",
    marginBottom: 446,
  },
});
