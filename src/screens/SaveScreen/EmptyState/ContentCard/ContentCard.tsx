import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { makeStyles } from './ContentCard.styles';
import BorderSVG from './BorderSVG';

export const ContentCard: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.container}>
			<View style={styles.imgContainer}>
				<BorderSVG />
			</View>
			<View style={styles.content}>
				{children}
			</View>
		</View>
	);
};
