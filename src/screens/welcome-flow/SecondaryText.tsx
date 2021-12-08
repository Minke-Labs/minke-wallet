import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    textAlign: "center"
  },
})

export default function SecondaryText({ children }: any) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.text, { color: colors.placeholder }]}>{children}</Text>
  )
}