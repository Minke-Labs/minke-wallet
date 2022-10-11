import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { Text } from '@components';
import Animated from 'react-native-reanimated';
import { makeStyles } from './Selector.styles';
import { SelectorProps } from './Selector.types';
import { useSelector } from './Selector.hooks';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { current, animatedBackgroundTag } = useSelector();

	return (
		<View style={{ paddingHorizontal: 24 }}>
			<View style={styles.container}>
				<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />
				{[
					i18n.t('TransactionsScreen.Selector.all'),
					i18n.t('TransactionsScreen.Selector.sent'),
					i18n.t('TransactionsScreen.Selector.received')
				].map((item, index) => (
					<TouchableOpacity
						key={item}
						onPress={() => {
							setActive(index);
							current.value = index;
						}}
						style={styles.buttonContainer}
					>
						<Text
							weight={active === index ? 'bold' : 'regular'}
							color={active === index ? 'text11' : 'text9'}
						>
							{item}
						</Text>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default Selector;
