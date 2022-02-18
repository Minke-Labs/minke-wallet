import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const BUTTON_WIDTH = 46;

const styles = StyleSheet.create({
	container: {
		width: 96,
		height: '100%',
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	backgroundTag: {
		position: 'absolute',
		backgroundColor: '#006AA6',
		width: BUTTON_WIDTH,
		height: 16,
		borderRadius: 16
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

interface SelectorProps {
	active: boolean;
	setActive: (active: boolean) => void;
}

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const { colors } = useTheme();

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(active ? BUTTON_WIDTH : 4) }]
	}));

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => setActive(!active)}
			style={[styles.container, { backgroundColor: colors.background1 }]}
		>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />
			<View style={styles.titleContainer}>
				<Text weight={active ? 'bold' : 'medium'} style={{ fontSize: 12 }} color={active ? 'text3' : 'text6'}>
					USD
				</Text>
			</View>
			<View style={styles.titleContainer}>
				<Text weight={active ? 'bold' : 'medium'} style={{ fontSize: 12 }} color={active ? 'text6' : 'text3'}>
					ETH
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default Selector;
