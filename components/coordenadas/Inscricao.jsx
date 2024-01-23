import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const Inscricao = ({ onInscricaoChange }) => {
  const [inscricaoImovel, setInscricaoImovel] = useState('');

  const handleInscricaoChange = (text) => {
    setInscricaoImovel(text);
    onInscricaoChange(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Insira a inscrição do imóvel"
        value={inscricaoImovel}
        onChangeText={handleInscricaoChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default Inscricao;
