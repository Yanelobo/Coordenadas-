import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const EnviarFotos = () => {
  const handleEnviarFotosPress = async () => {
    try {
      // Solicitar permissão para acessar a galeria de fotos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'A permissão para acessar a galeria de fotos é necessária.');
        return;
      }

      // Abrir o seletor de imagens
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Removendo a opção de edição/corte
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        selectionLimit: 100 // Permitir seleção de várias fotos
      });

      if (!result.cancelled) {
        // Imagens foram selecionadas, perguntar se o usuário quer compartilhá-las
        Alert.alert(
          'Compartilhar Imagens',
          'Deseja compartilhar as imagens selecionadas?',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Compartilhar',
              onPress: () => handleCompartilharImagens(result),
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Erro ao selecionar imagens:', error);
    }
  };

  const handleCompartilharImagens = async (result) => {
    try {
      // Compartilhar imagens usando o módulo Sharing
      await Sharing.shareAsync(result.uri);
    } catch (error) {
      console.error('Erro ao compartilhar imagens:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleEnviarFotosPress}>
      <Text style={styles.buttonText}>Enviar fotos</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default EnviarFotos;
