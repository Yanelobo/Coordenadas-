import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import * as Sharing from 'expo-sharing';

const salvarCoordenadasEmArquivo = async ({ inscricaoImovel }) => {
  try {
    // Ensure proper location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização negada');
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Log location data
    console.log('Latitude:', latitude, 'Longitude:', longitude);

    // Specify the path for the file within the document directory
    const filePath = `${FileSystem.documentDirectory}${inscricaoImovel}.csv`;

    // Write to the file in the document directory
    await FileSystem.writeAsStringAsync(filePath, `${inscricaoImovel}\n${latitude}\n${longitude}`);

    console.log('Coordenadas salvas em:', filePath);

    // Check if the file is fully written
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.size > 0) {
      // Share the file URI
      const fileUri = `${filePath}`;
      await Sharing.shareAsync(fileUri, { mimeType: 'text/plain', dialogTitle: 'Salvar Coordenadas' });
    } else {
      console.warn('O arquivo ainda não está totalmente escrito.');
    }

  } catch (error) {
    console.error('Erro ao salvar coordenadas em arquivo:', error);
  }
};

export { salvarCoordenadasEmArquivo };
