import { View } from "react-native";
import React from "react";

export default function Container({ children }: any) {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        }}>
            {children}
        </View>
    )
}
