import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

const styles = StyleSheet.create({
	container: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		borderTopRightRadius: 24,
		borderTopLeftRadius: 24
	},
	circle: {
		width: 40,
		height: 40,
		borderRadius: 20,
		position: 'absolute',
		bottom: 0
	},
	square: {
		width: 20,
		height: 20,
		position: 'absolute',
		bottom: 0,
		backgroundColor: '#fff'
	},
	titleBox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const choose = (active: boolean) => (active ? '#fff' : '#F2EAE1');

interface TabProps {
	active?: boolean;
	side: string;
	onTabSelect: Dispatch<SetStateAction<string>>
}

const Tab: React.FC<TabProps> = ({ children, active, side, onTabSelect }) => (
	<TouchableOpacity
		activeOpacity={1}
		onPress={() => onTabSelect(side === 'left' ? 'transactions' : 'net_worth')}
		style={[styles.container, { backgroundColor: active ? '#fff' : 'transparent' }]}
	>
		<View style={[styles.square, { [side === 'left' ? 'right' : 'left']: 0 }]} />
		<View
			style={[
				styles.circle,
				{
					left: 0,
					backgroundColor: choose(active!)
				}
			]}
		/>

		<View
			style={[
				styles.square,
				{
					[side === 'left' ? 'left' : 'right']: 0,
					backgroundColor: choose(active!)
				}
			]}
		/>
		<View
			style={[
				styles.circle,
				{
					right: 0,
					backgroundColor: choose(active!)
				}
			]}
		/>

		<View style={styles.titleBox}>{children}</View>
	</TouchableOpacity>
);

export default Tab;
