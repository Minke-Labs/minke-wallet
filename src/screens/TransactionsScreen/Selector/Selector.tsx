import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Animated from 'react-native-reanimated';
import { makeStyles } from './Selector.styles';
import { SelectorProps } from './Selector.types';
import { useSelector } from './Selector.hooks';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { current, animatedBackgroundTag } = useSelector();

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />
			{['All', 'Sent', 'Received'].map((item, index) => (
				<TouchableOpacity
					key={item}
					onPress={() => {
						setActive(index);
						current.value = index;
					}}
					style={styles.buttonContainer}
				>
					<Text weight={active === index ? 'bold' : 'regular'} color={active === index ? 'text11' : 'text9'}>
						{item}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Selector;
