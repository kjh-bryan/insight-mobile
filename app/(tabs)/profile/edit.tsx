import { TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { Button } from 'react-native-paper';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../services/user';
import { router } from 'expo-router';

export default function EditProfileScreen() {
  const { userId, name, username, email, password } = useSelector(
    (state: RootState) => state.user
  );

  const [usernameForm, setUsername] = useState(username);
  const [nameForm, setName] = useState(name);
  const [emailForm, setEmail] = useState(email);
  const [passwordForm, setPassword] = useState(password);

  const dispatch = useDispatch();

  const setUserInfo = (
    userId: any,
    name: any,
    username: any,
    email: any,
    password: any
  ) => {
    dispatch({
      type: 'SET_USER_INFO',
      payload: { userId, name, username, email, password },
    });
  };

  const { themeTextStyle, themeBackgroundStyle } = ThemeUtils();

  const updateSuccess = () =>
    Alert.alert(
      'Successful',
      'Your account has been successfully updated!',
      [
        {
          text: 'Contiune',
          onPress: () => router.push({ pathname: '/(tabs)/profile' }),
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );

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

      <View style={[styles.formContainer]}>
        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}
        >
          <Text weight='bold'>Name</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={nameForm}
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
          <Text weight='bold'>Username</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={usernameForm}
              onChangeText={(value) => setUsername(value)}
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
          <Text weight='bold'>Email</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={emailForm}
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
          <Text weight='bold'>Password</Text>
          <View style={[styles.inputField]}>
            <TextInput
              value={passwordForm}
              onChangeText={(value) => setPassword(value)}
              editable={true}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <Button
        style={[styles.saveButton]}
        onPress={async () => {
          try {
            const result = await updateUser(
              Number(userId),
              usernameForm,
              passwordForm,
              emailForm,
              nameForm
            );
            if (result) {
              console.log('User Screen result:', result);
              updateSuccess();
              setUserInfo(
                Number(userId),
                nameForm,
                usernameForm,
                emailForm,
                passwordForm
              );
            } else {
              console.error(
                'User Screen: Result or data property is undefined.'
              );
            }
          } catch (error) {
            console.log('User Screen: Registration error:', error);
          }
        }}
      >
        <Text style={[styles.saveButtonText]}>Save Changes</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
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
    backgroundColor: '#ffffff',
  },
  button: {
    top: 20,
    backgroundColor: Colors.light.primary,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary,
    borderRadius: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
