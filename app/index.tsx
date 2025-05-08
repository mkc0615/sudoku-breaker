import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku Breaker</Text>

      {/* Use Link to navigate to the gameboard route */}
      <Link href="/board" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Start Breaking</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Black background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff', // White text
  },
  button: {
    backgroundColor: '#fff', // White button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: '#fff', // White-ish shadow (optional)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#000', // Black text
    fontSize: 18,
    fontWeight: 'bold',
  },
});
