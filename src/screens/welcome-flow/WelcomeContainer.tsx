import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
});

export default function WelcomeContainer({ children }: any) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]} >
      {children}
      <StatusBar style="auto" />
    </View >
  )
}
