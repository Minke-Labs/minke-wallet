import React from 'react';
import { TouchableOpacity } from 'react-native';
import { IconType } from '@styles';
import { useTheme } from '@hooks';
import { Text, Icon } from '@components';
import styles from './styles';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({ name, icon, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				styles.actionsPanelCardContainer,
				{
					backgroundColor: colors.background2
				}
			]}
			onPress={onPress}
		>
			<Icon size={20} name={icon as IconType} color="cta1" style={{ marginRight: 8 }} />
			<Text weight="medium" type="a">
				{name}
			</Text>
		</TouchableOpacity>
	);
};
