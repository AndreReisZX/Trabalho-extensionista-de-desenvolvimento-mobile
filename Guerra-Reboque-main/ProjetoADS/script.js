import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';

const Stack = createStackNavigator();

const services = [
  { id: '1', name: 'Reboque Leve', icon: 'car', isLarge: true },
  { id: '2', name: 'Trocar Pneu', icon: 'circle' },
  { id: '3', name: 'Bateria', icon: 'battery-full' },
  { id: '4', name: 'Combustível', icon: 'tint' },
  { id: '5', name: 'Táxi', icon: 'car' },
  { id: '6', name: 'Utilitário', icon: 'truck' },
  { id: '7', name: 'Semi Pesado', icon: 'truck' },
  { id: '8', name: 'Maquinário', icon: 'cogs' },
  { id: '9', name: 'Chaveiro', icon: 'key' },
];

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ServiceScreen" component={ServiceScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    navigation.navigate('ServiceScreen');
  };

  return (
    <View style={styles.login.container}>
      <View style={styles.login.titleContainer}>
        <Text style={styles.login.title}>Guerra</Text>
        <Text style={styles.login.subTitle}>Reboque</Text>
      </View>
      <View style={styles.login.inputContainer}>
        <Icon name="user" size={20} color="#fff" />
        <TextInput
          style={styles.login.input}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.login.inputContainer}>
        <Icon name="lock" size={20} color="#fff" />
        <TextInput
          style={styles.login.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.login.button} onPress={handleLogin}>
        <Text style={styles.login.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.login.link} onPress={() => Alert.alert('Redirecionar para recuperação de senha')}>
        Esqueceu a senha?
      </Text>
      <Text style={styles.login.link} onPress={() => navigation.navigate('SignUpScreen')}>
        Criar conta
      </Text>
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [plate, setPlate] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword || !cpf || !cnh || !plate) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }
    if (cpf.length !== 11 || isNaN(cpf)) {
      Alert.alert('Erro', 'O CPF deve conter exatamente 11 dígitos numéricos.');
      return;
    }
    if (cnh.length !== 11 || isNaN(cnh)) {
      Alert.alert('Erro', 'A CNH deve conter exatamente 11 dígitos numéricos.');
      return;
    }
    if (plate.length !== 17) {
      Alert.alert('Erro', 'A placa do veículo deve conter exatamente 17 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem.');
      return;
    }
    Alert.alert('Sucesso', 'Conta criada com sucesso!');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.signup.container}>
      <View style={styles.signup.titleContainer}>
        <Text style={styles.signup.title}>Guerra</Text>
        <Text style={styles.signup.subTitle}>Reboque</Text>
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="user" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="envelope" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="id-card" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="CPF"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          maxLength={11}
          value={cpf}
          onChangeText={text => {
            const filtered = text.replace(/[^0-9]/g, ''); // Filtrar apenas números
            setCpf(filtered);
          }}
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="id-card" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="CNH"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          maxLength={11}
          value={cnh}
          onChangeText={text => {
            const filtered = text.replace(/[^0-9]/g, ''); // Filtrar apenas números
            setCnh(filtered);
          }}
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="car" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="Placa do veículo"
          placeholderTextColor="#aaa"
          maxLength={17}
          value={plate}
          onChangeText={setPlate}
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="lock" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.signup.inputContainer}>
        <Icon name="lock" size={20} color="#fff" />
        <TextInput
          style={styles.signup.input}
          placeholder="Confirmar Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.signup.button} onPress={handleSignUp}>
        <Text style={styles.signup.buttonText}>Criar conta</Text>
      </TouchableOpacity>
      <Text style={styles.signup.link} onPress={() => navigation.navigate('LoginScreen')}>
        Voltar
      </Text>
    </View>
  );
};

const ServiceScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = async (serviceName) => {
    Alert.alert(
      'Confirmar Serviço',
      `Você deseja solicitar ${serviceName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: async () => {
          setLoading(true);
          await getLocation();
          setLoading(false);
        }},
      ]
    );
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão para acessar localização negada.');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    Alert.alert('Localização Obtida', JSON.stringify(location));
  };

    const footerIcons = [
    {
      name: 'whatsapp',
      url: 'https://wa.me/5521976011899',
    },
    {
      name: 'envelope',
      url: 'mailto:lucasstraub7@hotmail.com',
    },
    {
      name: 'phone',
      url: 'tel:+5521976288922',
    },
  ];

  return (
    <View style={styles.service.container}>
      <View style={styles.service.titleContainer}>
        <Text style={styles.service.title}>Guerra</Text>
        <Text style={styles.service.subTitle}>Reboque</Text>
      </View>
      <View style={styles.service.serviceContainer}>
        <View style={styles.service.row}>
          <TouchableOpacity
            key={services[0].id}
            style={[styles.service.card, styles.service.largeCard]}
            onPress={() => requestLocation(services[0].name)}
          >
            <Text style={styles.service.largeCardText}>
              <Icon name={services[0].icon} size={30} /> {services[0].name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.service.grid}>
          {services.slice(1).map(service => (
            <TouchableOpacity
              key={service.id}
              style={styles.service.card}
              onPress={() => requestLocation(service.name)}
            >
              <Icon name={service.icon} size={30} />
              <Text style={styles.service.cardText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {loading && <Text style={styles.service.loadingText}>Buscando localização...</Text>}
      <View style={styles.service.footer}>
        {footerIcons.map(icon => (
          <TouchableOpacity key={icon.name} onPress={() => Linking.openURL(icon.url)} style={{ alignItems: 'center', marginHorizontal: 20 }}>
            <Icon name={icon.name} size={30} color="#fff" /> 
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Estilos
const styles = {
  login: StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000',
      alignItems: 'center',
    },
    titleContainer: {
      marginTop: 200,
      alignItems: 'center',
      marginVertical: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
    },
    subTitle: {
      fontSize: 30,
      color: '#fff',
      marginTop: -15, 
      marginLeft: 60,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333',
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      width: '100%',
    },
    input: {
      flex: 1,
      height: 40,
      color: '#fff',
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
      width: '100%',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    link: {
      color: '#fff',
      marginVertical: 5,
    },
  }),
  signup: StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000',
      alignItems: 'center',
    },
    titleContainer: {
      marginTop: 100,
      alignItems: 'center',
      marginVertical: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
    },
    subTitle: {
      fontSize: 30,
      color: '#fff',
      marginTop: -15, 
      marginLeft: 60,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#333',
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      width: '100%',
    },
    input: {
      flex: 1,
      height: 40,
      color: '#fff',
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: 'green',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
      width: '100%',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    link: {
      color: '#fff',
      marginVertical: 5,
    },
  }),
  service: StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000',
      alignItems: 'center',
    },
    titleContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    title: {
      marginTop:50,
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
    },
    subTitle: {
      fontSize: 30,
      color: '#fff',
      marginTop: -15, 
      marginLeft: 60,
    },
    serviceContainer: {
      width: '100%',
      marginTop: 10,
    },
    row: {
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: 'gray',
      padding: 15,
      marginVertical: 10,
      borderRadius: 5,
      width: '48%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    largeCard: {
      height: 80,
      width: '100%',
      alignSelf: 'center',
    },
    cardText: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginLeft: 10,
      fontSize: 18,
    },
    largeCardText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 24,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loadingText: {
      color: '#fff',
      marginTop: 20,
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center', 
    },
  }),
};

export default App;
