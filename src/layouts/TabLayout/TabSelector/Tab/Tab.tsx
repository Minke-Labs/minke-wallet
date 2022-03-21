import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { ColorType } from '@styles';
import styles from './Tab.styles';
import { TabProps } from './Tab.types';

const chooseBg = (active: boolean, colors: ColorType) => ({
	...{ backgroundColor: active ? colors.detail4 : colors.background1 }
});

const Tab: React.FC<TabProps> = ({ children, active, side, onTabSelect }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => onTabSelect(side === 'left' ? 'transactions' : 'net_worth')}
			style={{ width: '50%' }}
		>
			<View style={[styles.container, { backgroundColor: active ? colors.detail4 : colors.background1 }]}>
				<View
					style={[
						styles.square,
						{ [side === 'left' ? 'right' : 'left']: 0, backgroundColor: colors.detail4 }
					]}
				/>
				<View style={[styles.circle, { left: 0, ...chooseBg(active!, colors) }]} />
				<View
					style={[styles.square, { [side === 'left' ? 'left' : 'right']: 0, ...chooseBg(active!, colors) }]}
				/>
				<View style={[styles.circle, { right: 0, ...chooseBg(active!, colors) }]} />
				<View style={styles.titleBox}>{children}</View>
			</View>
		</TouchableOpacity>
	);
};

export default Tab;
