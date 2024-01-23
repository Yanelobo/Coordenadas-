import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { salvarCoordenadasEmArquivo } from './SalvarCoordenadas';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

const Salvar = ({ fotoHidrometro, inscricaoImovel, fotoFachada }) => {
  const salvarFotoHidrometro = async () => {
    try {
      // Obter as coordenadas atuais
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
  
      // Salvar a foto do hidrômetro localmente
      await salvarFotoLocalmente(fotoHidrometro, `${inscricaoImovel}.jpg`);
      // Salvar as coordenadas em um arquivo de texto
      await salvarCoordenadasEmArquivo({inscricaoImovel, latitude, longitude});
    } catch (error) {
      console.error('Erro ao salvar foto do hidrômetro:', error);
    }
    
  };

  const salvarFotoFachada = async () => {
    try {
      // Aguardar a conclusão da criação do diretório
      await criarDiretorio();

      // Verificar se fotoFachada é válida
      if (fotoFachada && typeof fotoFachada === 'string') {
        // Salvar a foto da fachada agora que o diretório está criado
        await salvarFotoLocalmente(fotoFachada, `${inscricaoImovel}(1).jpg`);
      } else {
        console.error('A foto da fachada é inválida.');
      }
    } catch (error) {
      console.error('Erro ao salvar foto da fachada no rolo da câmera:', error);
    }
  };

  const criarDiretorio = async () => {
    // Criar um diretório para armazenar as fotos localmente (pasta TESTE)
    const directory = `${FileSystem.documentDirectory}TESTE/`;
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  };

  const salvarFotoLocalmente = async (foto, nomeArquivo) => {
    try {
      // Construir o caminho de destino da foto
      const caminhoDestino = `${FileSystem.documentDirectory}TESTE/${nomeArquivo}`;

      // Verificar se a foto é válida antes de tentar copiar
      if (foto && typeof foto === 'string') {
        // Salvar a imagem no diretório correspondente
        await FileSystem.copyAsync({ from: foto, to: caminhoDestino });

        // Adicionar a foto ao rolo da câmera
        await MediaLibrary.saveToLibraryAsync(caminhoDestino);

        console.log('Foto salva no rolo da câmera:', caminhoDestino);
      } else {
        console.error('A foto é inválida.');
      }
    } catch (error) {
      console.error('Erro ao salvar foto no rolo da câmera:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={salvarFotoHidrometro} style={styles.button}>
        <Text style={styles.buttonText}>Salvar Foto Hidrômetro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={salvarFotoFachada} style={styles.button}>
        <Text style={styles.buttonText}>Salvar Foto Fachada</Text>
      </TouchableOpacity>
    </View>
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
export default Salvar;