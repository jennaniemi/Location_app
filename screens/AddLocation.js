import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, Image } from "react-native";
import { Rating } from "react-native-ratings"; // Star rating component
import { collection, addDoc } from "firebase/firestore"; // Firestore
import { db } from "../firebaseConfig"; // Firebase config

export default function AddLocation({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);

  // Error message that pops up if you don't fill out all the text inputs and/or give a rating
  const handleAddLocation = async () => {
    if (!name || !description || rating === 0) {
      return Alert.alert("Error", "Please fill all fields and give a rating :)");
    }

       // Save new location to Firestore
    try {
      await addDoc(collection(db, "locations"), {
        name,
        description,
        rating,
      });

       // Show success alert and return to LocationsList screen
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
      {/* Input fields for location name and description */}
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
       {/* Star rating component */}
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
           {/* Display an image */}
        <Image
          source={require('../assets/images/Corporation Cats.jpg')}
          style={styles.image}
        />
      </View>
    </View>
  );
}

// Styling
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
