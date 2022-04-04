import React from 'react';
import { View } from 'react-native';
import { styles } from './IconInner.styles';
import { IconInnerProps } from './IconInner.types';

// TODO: Add the righ icons when the design is ready.
const IconInner: React.FC<IconInnerProps> = ({ pending, failed }) => {
	if (pending && !failed) {
		return <View style={[styles.container, { backgroundColor: 'yellow' }]} />;
	}

	if (failed) {
		return <View style={[styles.container, { backgroundColor: 'red' }]} />;
	}

	return null;
};

export default IconInner;
