import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Paper, IconBox } from '@components';
import { IconType } from '@styles';
import { numberFormat } from '@helpers/utilities';

interface CardProps {
	title: string;
	desc: string;
	number?: number | undefined;
	icon: IconType;
	onPress: () => void;
}
export const Card: React.FC<CardProps> = ({ title, desc, number, icon, onPress }) => (
	<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
		<Paper p="s">
			<IconBox icon={icon} bgc="background3" mb="xxs" />
			<Text type="lLarge" weight="semiBold">
				{title}
			</Text>
			<Text type="bDetail" color="text4" mb="xxs" width={127}>
				{desc}
			</Text>
			<Text type="lMedium" weight="semiBold" color="text2">
				{number !== undefined && numberFormat(number, 2)}
			</Text>
		</Paper>
	</TouchableOpacity>
);
