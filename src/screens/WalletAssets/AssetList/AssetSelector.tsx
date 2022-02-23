import React from 'react';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { View, TouchableOpacity } from 'react-native';

interface ButtonProps {
	onPress: () => void;
	active: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, active, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={{
				flex: 0,
				paddingHorizontal: 12,
				height: '100%',
				borderRadius: 24,
				borderWidth: 1,
				alignItems: 'center',
				justifyContent: 'center',
				alignSelf: 'center',
				marginRight: 8,
				backgroundColor: active ? colors.text8 : 'transparent',
				borderColor: active ? colors.text10 : colors.detail4
			}}
			activeOpacity={0.6}
			onPress={onPress}
		>
			<Text type="a" weight="medium">
				{children}
			</Text>
		</TouchableOpacity>
	);
};

interface AssetSelectorProps {
	active: number;
	setActive: (active: number) => void;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ active, setActive }) => (
	<View
		style={{
			height: 31,
			paddingHorizontal: 24,
			flexDirection: 'row'
		}}
	>
		<Button active={active === 0} onPress={() => setActive(0)}>
			All coins
		</Button>
		<Button active={active === 1} onPress={() => setActive(1)}>
			Stable coins
		</Button>
	</View>
);

export default AssetSelector;
