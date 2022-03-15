import React from 'react';
import { View } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import { AnimatedText, PercChange } from '@components';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ price, current, graphs }) => {
	const data = useDerivedValue(() => graphs[current.value].data);
	const percChange = data.value.percentChange > 0;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<AnimatedText marginBottom={2} text={price} weight="extraBold" style={styles.animatedText} />
				<View style={styles.indicatorContainer}>
					<PercChange {...{ percChange, data, current, graphs }} />
				</View>
			</View>
		</View>
	);
};

export default Header;
