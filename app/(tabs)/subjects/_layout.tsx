import React from 'react';
import { Link, Stack, router } from 'expo-router';
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StackLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notes"
        options={{
          title: '',
          header: () => (
            <View
              style={{
                height: 20,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <AntDesign
                name="caretleft"
                onPress={() => {
                  router.back();
                }}
                size={20}
                color={Colors.default.slate600}
                style={{ marginLeft: 20 }}
              />
              <Text style={{ marginLeft: 10 }}>Back</Text>
            </View>
          ),
          headerShadowVisible: false,
          headerTintColor: Colors.default.primary,
        }}
      />
      <Stack.Screen
        name="pdf"
        options={{
          title: '',
          header: () => (
            <View
              style={{
                height: 20,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <AntDesign
                name="caretleft"
                onPress={() => {
                  router.back();
                }}
                size={20}
                color={Colors.default.slate600}
                style={{ marginLeft: 20 }}
              />
              <Text style={{ marginLeft: 10 }}>Back</Text>
            </View>
          ),
          headerShadowVisible: false,
          headerTintColor: Colors.default.primary,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
