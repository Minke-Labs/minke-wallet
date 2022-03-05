import { View } from 'react-native';
import React from 'react';
import { Icon } from '@components';
import { useTheme } from '@hooks';
import styles from './styles';
import { ImageProps } from './types';

const Image: React.FC<ImageProps> = ({ icon = 'wallet2Stroke', alert }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<View style={[styles.background, { backgroundColor: alert ? colors.alert1 : colors.alert5 }]} />
			<Icon name={icon} size={20} color={alert ? 'alert1' : 'text7'} style={{ position: 'absolute' }} />
		</View>
	);
};

export default Image;
