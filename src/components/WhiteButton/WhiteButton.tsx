import { Text, Icon } from '@components';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { IconType } from '@styles';
import { useTheme } from '@hooks';
import styles from './WhiteButton.styles';

interface WhiteButtonProps {
	title: string;
	onPress: () => void;
	icon: IconType;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ title, onPress, icon }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity style={[styles.container, { backgroundColor: colors.background2 }]} onPress={onPress}>
			<Icon name={icon} size={16} />
			<Text color="text1" style={{ marginLeft: 8 }}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default WhiteButton;
