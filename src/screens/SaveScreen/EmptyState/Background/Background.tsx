import React from 'react';
import { View, ImageBackground, useColorScheme } from 'react-native';
import { useTheme } from '@hooks';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { makeStyles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.backgroundContainer}>
			<ImageBackground
				source={scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground}
				style={styles.bgImage}
			/>
			{children}
		</View>
	);
};
