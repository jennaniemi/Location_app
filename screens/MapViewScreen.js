import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyBzbJO-lwlJiSJq7RHuO8duzS9Q_3PIjyo");

export default function MapViewScreen({ route }) {
  const { location } = route.params;
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location?.name) {
      Geocoder.from(location.name)
        .then(response => {
          const { lat, lng } = response.results[0].geometry.location;
          setCoordinates({ latitude: lat, longitude: lng });
        })
        .catch(error => console.error("Geocoding error:", error))
        .finally(() => setLoading(false));
    }
  }, [location]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {coordinates ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={coordinates} title={location.name} description={location.description} />
        </MapView>
      ) : (
        <Text style={styles.errorText}>Location not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { textAlign: "center", marginTop: 20, fontSize: 18, color: "red" },
});
