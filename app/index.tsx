import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { SIZES } from '../constants/Theme';
import { Button } from 'react-native-paper';
import Colors from '../constants/Colors';
import { router } from 'expo-router';

export default function InitalScreen() {
  return (
    <View style={[styles.container]}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={[styles.welcomeText]} weight='bold'>
        Welcome to Insight!
      </Text>
      <Button style={[styles.loginbutton]} mode="contained" onPress={() => {router.push({pathname: '/(access)/login'})}}>
        Login
      </Button>
      <Button style={[styles.registerButton]} mode="contained" onPress={() => {router.push({pathname: '/(access)/register'})}}>
        Register
      </Button>
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
    justifyContent: 'center'
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 14,
  },
  loginbutton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary
  },
  registerButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.complementGreen
  }
});
