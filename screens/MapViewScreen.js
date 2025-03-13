import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 65.4800;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;

export default function MapScreen({ route }) {
  const { location } = route.params;

  const [latitude, setLatitude] = useState(INITIAL_LATITUDE);
  const [longitude, setLongitude] = useState(INITIAL_LONGITUDE);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert("Permission to access location was denied");
        return;
      }

      const locationData = await Location.getLastKnownPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (locationData) {
        setLatitude(locationData.coords.latitude);
        setLongitude(locationData.coords.longitude);
      } else {
        alert("Unable to fetch location.");
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading Map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude || INITIAL_LATITUDE,
          longitude: longitude || INITIAL_LONGITUDE,
          latitudeDelta: INITIAL_LATITUDE_DELTA,
          longitudeDelta: INITIAL_LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
      >
        {location && location.coordinates && (
          <Marker
            title={location.name}
            description={location.description}
            coordinate={{
              latitude: location.coordinates.latitude,
              longitude: location.coordinates.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
