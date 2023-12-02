import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import { SIZES } from '../../constants/Theme';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container]}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={[styles.welcomeText]} weight="bold">
        Create Account
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => setName(text)}
        value={name}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        style={[styles.registerButton]}
        onPress={() => {
          router.push({ pathname: '/(tabs)' });
        }}
      >
        Register
      </Button>
      <Text>
        Already have an account?{' '}
        <TouchableOpacity
          onPress={() => {
            router.push({pathname: '/login'})
          }}
        >
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 25,
    lineHeight: 26,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  registerButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary,
    borderRadius: 10
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});
