import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import { SIZES } from '../../constants/Theme';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';
import React, { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={[styles.container]}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={[styles.welcomeText]} weight="bold">
        Welcome back!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button
        style={[styles.loginbutton]}
        mode="contained"
        onPress={() => {
          router.push({ pathname: '/(tabs)' });
        }}
      >
        Login
      </Button>
      <Text>
        Don't have an account?{' '}
        <TouchableOpacity
          onPress={() => {
            router.push({pathname: '/register'})
          }}
        >
          <Text style={styles.signUpLink}>Sign up</Text>
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
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  loginbutton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary,
    borderRadius: 10
  },
  signUpLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10
  },
});
