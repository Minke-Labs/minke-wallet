import React from 'react';
import { View as RNView, StyleProp, ViewStyle } from 'react-native';

interface ViewProps {
	style?: StyleProp<ViewStyle>;
}

const View: React.FC<ViewProps> = ({ children, style }) => (
	<RNView
		style={{
			...(style as object)
		}}
	>
		{children}
	</RNView>
);

export default View;
