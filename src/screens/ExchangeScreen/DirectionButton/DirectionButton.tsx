import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@components';
import { useTheme } from '@hooks';

interface DirectionButtonProps {
	onPress: () => void;
	disabled?: boolean;
	right?: boolean;
}

const DirectionButton: React.FC<DirectionButtonProps> = ({ onPress, disabled, right }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={{
				width: 32,
				height: 32,
				borderRadius: 16,
				backgroundColor: colors.background1,
				alignItems: 'center',
				justifyContent: 'center',
				position: 'absolute'
			}}
			{...{ onPress, disabled }}
		>
			<Icon
				name={right ? 'arrowRight' : 'arrowDown'}
				size={20}
				color="cta1"
			/>
		</TouchableOpacity>
	);
};

export default DirectionButton;
