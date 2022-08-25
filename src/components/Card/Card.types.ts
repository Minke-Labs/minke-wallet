import React from 'react';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface CardProps {
	title: string;
	subtitle: string;
	image: React.ReactChild;
	right?: React.ReactChild;
	style?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	subtitleStyle?: StyleProp<TextStyle>;
	onPress?: () => void;
	marginBottom?: number;
	thirdRowText?: string | number;
	thirdRowStyle?: StyleProp<TextStyle>;
}
