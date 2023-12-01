import {
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { imagesDataURL } from '../../constants/Data';
import { ThemeUtils } from '../../utils/ThemeUtils';
import EditScreenInfo from '../../components/EditScreenInfo';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../constants/Theme';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState(imagesDataURL[0]);
  const [name, setName] = useState('Melissa Peters');
  const [email, setEmail] = useState('metperters@gmail.com');
  const [password, setPassword] = useState('randompassword');

  const handleImageSelection = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: themeBackgroundStyle.backgroundColor,
        paddingHorizontal: 22,
      }}
    >
      <View style={[styles.titleHeader, themeBackgroundStyle]}>
        <Text style={[styles.title, themeTextStyle]}>
          Edit <Text style={styles.titleColor}>Profile</Text>
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          marginVertical: 22,
        }}
      >
        <TouchableOpacity onPress={handleImageSelection}>
          <Image
            source={{ uri: selectedImage }}
            style={{
              height: 170,
              width: 170,
              borderRadius: 85,
              borderWidth: 2,
              borderColor: '#000000',
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 10,
              zIndex: 9999,
            }}
          >
            <MaterialIcons name="photo-camera" size={32} color={Colors.light.primary} />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}
        >
          <Text weight="bold">Name</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}
        >
          <Text weight="bold">Email</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              editable={true}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}
        >
          <Text weight="bold">Password</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              editable={true}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={[styles.button]}>
        <Text style={[styles.saveButtonText]} weight="bold">
          Save Change
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.h1,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  inputField: {
    height: 44,
    width: '100%',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: 6,
    justifyContent: 'center',
    paddingLeft: 8,
    backgroundColor: '#ffffff'
  },
  button: {
    top: 20,
    backgroundColor: Colors.light.primary,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.dark.text,
  },
});
