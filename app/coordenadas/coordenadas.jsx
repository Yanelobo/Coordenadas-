import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Fotofachada from '../../components/coordenadas/Fotofachada';
import Fotohidrometro from '../../components/coordenadas/Fotohidrometro';
import Inscricao from '../../components/coordenadas/Inscricao';
import Salvar from '../../components/coordenadas/Salvar';
import CoordenadasAtuais from '../../components/coordenadas/Coordenadasatuais';

const Coordenadas = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImageFachada, setCapturedImageFachada] = useState(null);
  const [inscricaoImovel, setInscricaoImovel] = useState('');

  const handleFotoCapturada = (capturedPhoto) => {
    setCapturedImage(capturedPhoto);
  };

  const handleFotoCapturadaFachada = (capturedPhotoFachada) => {
    setCapturedImageFachada(capturedPhotoFachada);
  };

  const handleInscricaoChange = (inscricao) => {
    setInscricaoImovel(inscricao);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFC' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={{ flex: 1, padding: 16 }}>
        <Fotohidrometro onFotoCapturada={handleFotoCapturada} />
        <Fotofachada onFotoFachadaCapturada={handleFotoCapturadaFachada}/>
        <Inscricao onInscricaoChange={handleInscricaoChange} />
        <Salvar fotoHidrometro={capturedImage} fotoFachada={capturedImageFachada} inscricaoImovel={inscricaoImovel} />
        <CoordenadasAtuais />
      </View>
    </SafeAreaView>
  );
};

export default Coordenadas;