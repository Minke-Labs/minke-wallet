import React from "react";
import { Button, useTheme } from 'react-native-paper';

interface Props {
  children: any;
  onPress: Function;
  mode?: string
}

const PrimaryButton: React.FC<Props> = ({ children, onPress, mode = "contained" }: any) => {
  const { colors } = useTheme();
  return (
    <Button
      theme={{ roundness: 30 }}
      mode={mode}
      onPress={onPress}
      uppercase={false}
      labelStyle={{
        fontSize: 16,
        color: mode == "contained" ? colors.buttonText : colors.linkText
      }}
      style={{
        alignSelf: "stretch",
        marginHorizontal: 20,
        padding: 10
      }}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton;
