import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconType, ColorType } from '@styles';
import { useTheme } from '@hooks';
import styles from './WhiteButton.styles';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

interface WhiteButtonProps {
	title: string;
	onPress: () => void;
	icon: IconType;
	color?: keyof ColorType;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ title, onPress, icon, color }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity style={[styles.container, { backgroundColor: colors.background2 }]} onPress={onPress}>
			<Icon name={icon} size={16} color={color} />
			<Text color="text1" style={{ marginLeft: 8 }}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default WhiteButton;
