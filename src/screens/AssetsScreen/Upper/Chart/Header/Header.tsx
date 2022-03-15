import React from 'react';
import { View } from 'react-native';
import { AnimatedText, PercChange } from '@components';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ price, current, graphs, percChange }) => (
	<View style={styles.container}>
		<View style={styles.titleContainer}>
			<AnimatedText marginBottom={2} text={price} weight="extraBold" style={styles.animatedText} />
			<View style={styles.indicatorContainer}>
				<PercChange {...{ current, graphs, percChange }} />
			</View>
		</View>
	</View>
);

export default Header;
