import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { makeStyles } from './HeaderContainer.styles';

const HeaderContainer: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>{children}</View>
		</View>
	);
};

export default HeaderContainer;
