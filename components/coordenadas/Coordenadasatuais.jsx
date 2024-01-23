import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

const CoordenadasAtuais = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Solicitar permissão de localização
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      // Obter as coordenadas da localização atual
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    // Configurar a atualização contínua da localização
    const watchId = Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 10 },
      (newLocation) => {
        setLocation(newLocation);
      }
    );

    // Limpar o observador quando o componente for desmontado
    return () => {
      if (watchId) {
        watchId.remove();
      }
    };
  }, []);

  return (
    <View>
      <Text>Latitude: {location ? location.coords.latitude : 'Carregando...'}</Text>
      <Text>Longitude: {location ? location.coords.longitude : 'Carregando...'}</Text>
    </View>
  );
};

export default CoordenadasAtuais;
