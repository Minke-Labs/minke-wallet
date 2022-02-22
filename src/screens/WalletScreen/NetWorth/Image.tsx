import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from '@components';
import { useTheme } from '@hooks';
import { IconType } from '@styles';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	background: {
		opacity: 0.1,
		width: 40,
		height: 40,
		borderRadius: 12
	}
});

interface ImageProps {
	icon?: IconType;
	alert?: boolean;
}

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
