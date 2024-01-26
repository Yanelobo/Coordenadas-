import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';

const Fotofachada = ({ onFotoFachadaCapturada  }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isModalVisible, setModalVisible] = useState(false);
  const [capturedImageFachada, setCapturedImageFachada] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

   const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setCapturedImageFachada(photo.uri);
      // Chama a função de callback para passar a foto para o componente pai
      onFotoFachadaCapturada (photo.uri);
      setModalVisible(true);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderCameraView = () => (
    <Camera
      style={{ flex: 1 }}
      type={type}
      ref={(ref) => setCameraRef(ref)}
      autoFocus={Camera.Constants.AutoFocus.on}
    >
      <TouchableOpacity style={styles.cameraButton} onPress={handleTakePicture}>
        <View style={styles.innerButton} />
      </TouchableOpacity>
    </Camera>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Tirar foto da fachada</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        {capturedImageFachada ? (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: capturedImageFachada }} style={{ flex: 1 }} />
            <View style={styles.buttonContainer}>
              <Button title="Tirar Outra Foto" onPress={() => setCapturedImageFachada(null)} />
              <Button title="Confirmar" onPress={toggleModal} />
            </View>
          </View>
        ) : (
          renderCameraView()
        )}
      </Modal>
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
  cameraButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
});

export default Fotofachada;
