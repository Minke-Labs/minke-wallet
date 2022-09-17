import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@src/components/Icon/Icon';
import ActivityIndicator from '@src/components/ActivityIndicator/ActivityIndicator';
import { useTheme } from '@hooks';

interface DirectionButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	right?: boolean;
	loading?: boolean;
}

const DirectionButton: React.FC<DirectionButtonProps> = ({ onPress, disabled, right, loading }) => {
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
			{loading ? (
				<ActivityIndicator />
			) : (
				<Icon name={right ? 'arrowRight' : 'arrowDown'} size={20} color={disabled ? 'detail2' : 'cta1'} />
			)}
		</TouchableOpacity>
	);
};

export default DirectionButton;
