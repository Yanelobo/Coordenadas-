import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router';

// import styles from './welcome.style'

const Tirarfoto = () => {
  const router = useRouter()
  return (
    <TouchableOpacity style={styles.button}
      onPress={() => {
        router.push(`/coordenadas/coordenadas`)
      }}
    >
      <Text style = {styles.buttonText}>Tirar Fotos</Text>
    </TouchableOpacity>
  )
}

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

export default Tirarfoto