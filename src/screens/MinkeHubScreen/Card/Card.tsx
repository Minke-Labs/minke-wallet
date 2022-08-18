import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, Paper2, IconBox } from '@components';
import { IconType } from '@styles';

interface CardProps {
	title: string;
	desc: string;
	number?: string;
	icon: IconType;
	onPress: () => void;
}
export const Card: React.FC<CardProps> = ({ title, desc, number, icon, onPress }) => (
	<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
		<Paper2 br={3} p={4}>
			<IconBox
				icon={icon}
				bgc="background3"
				mb={2}
			/>
			<Text type="lLarge" weight="semiBold">
				{title}
			</Text>
			<Text type="bDetail" color="text4" mb={2} width={127}>
				{desc}
			</Text>
			{!!number && (
				<Text type="lMedium" weight="semiBold" color="text2">
					{number}
				</Text>
			)}
		</Paper2>
	</TouchableOpacity>
);
