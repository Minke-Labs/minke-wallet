import React from 'react';
import { Text, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  mainText: {
    fontSize: 36,
    lineHeight: 43,
    fontFamily: 'DMSans_700Bold',
    textAlign: "center",
    marginBottom: 16
  },
})

export default function MainText({ children }: any) {
  const { colors } = useTheme();
  return (
    <Text style={[styles.mainText, { color: colors.text }]}>{children}</Text>
  )
}
