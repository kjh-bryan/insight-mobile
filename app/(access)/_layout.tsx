import React from 'react';
import { Link, Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StackLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
