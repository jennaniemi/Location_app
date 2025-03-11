
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AddLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const handleAddLocation = async () => {
    if (!name || !description || !rating) return alert("Please fill all fields");

    await addDoc(collection(db, "locations"), {
      name,
      description,
      rating: Number(rating),
    });

    alert("Location Added!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <TextInput placeholder="Rating (1-5)" style={styles.input} keyboardType="numeric" value={rating} onChangeText={setRating} />
      <Button title="Add Location" onPress={handleAddLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 10, fontSize: 16 },
});
