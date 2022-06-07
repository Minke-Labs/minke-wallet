import React from 'react';
import { StyleProp, ViewStyle, GestureResponderEvent, TextStyle } from 'react-native';

export interface CardProps {
	title: string;
	subtitle: string;
	image: React.ReactChild;
	right?: React.ReactChild;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	subtitleStyle?: StyleProp<TextStyle>;
	onPress?: (event: GestureResponderEvent) => void;
	marginBottom?: number;
	thirdRowText?: string;
	thirdRowStyle?: StyleProp<TextStyle>;
}
