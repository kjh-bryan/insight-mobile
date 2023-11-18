import React from 'react';
import { Link, Stack, router } from 'expo-router';
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { AntDesign } from '@expo/vector-icons';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
        name="subjectquiz"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
