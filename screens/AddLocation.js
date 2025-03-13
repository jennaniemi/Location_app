import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, Image } from "react-native";
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
        imageSize={40}
        startingValue={rating}
        onFinishRating={setRating}
        jumpValue={1}
        fractions={0}
        tintColor="black"
        style={styles.rating}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Location" onPress={handleAddLocation} />
      </View>


      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Corporation Cats.jpg')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#333",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 15,
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  rating: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center", 
    width: "100%", 
    marginTop: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
});
