import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './Tab.styles';

const chooseBg = (active: boolean) => ({ ...{ backgroundColor: active ? '#fff' : '#F2EAE1' } });

interface TabProps {
	active?: boolean;
	side: string;
	onTabSelect: Dispatch<SetStateAction<string>>;
}

const Tab: React.FC<TabProps> = ({ children, active, side, onTabSelect }) => (
	<TouchableOpacity
		activeOpacity={1}
		onPress={() => onTabSelect(side === 'left' ? 'transactions' : 'net_worth')}
		style={{ width: '50%' }}
	>
		<View style={[styles.container, { backgroundColor: active ? '#fff' : '#F2EAE1' }]}>
			<View style={[styles.square, { [side === 'left' ? 'right' : 'left']: 0 }]} />
			<View style={[styles.circle, { left: 0, ...chooseBg(active!) }]} />
			<View style={[styles.square, { [side === 'left' ? 'left' : 'right']: 0, ...chooseBg(active!) }]} />
			<View style={[styles.circle, { right: 0, ...chooseBg(active!) }]} />
			<View style={styles.titleBox}>{children}</View>
		</View>
	</TouchableOpacity>
);

export default Tab;
