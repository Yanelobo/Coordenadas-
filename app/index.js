import { View, Text, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Tirarfoto from '../components/home/tirarfoto/Tirarfoto';
//import { registerRootComponent } from 'expo';



const Home = () => {
    const router = useRouter()
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFC' }}>
            <Stack.Screen
                options={{
                    headerShadowVisible: false,
                    headerTitle: "Coordenadas"
                }}
            />
            <View style={{ flex: 1, padding: 16}}>
                <Tirarfoto/>
            </View>
        </SafeAreaView>
    )
}

export default Home;