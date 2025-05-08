import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      {/* Define screen options for individual routes */}
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="board" options={{ title: 'Board' }} />
    </Stack>
  );
}