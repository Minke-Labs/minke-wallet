import React from 'react';
import { Text, Paper, IconBox, BlankStates, Touchable } from '@components';
import { IconType } from '@styles';
import { numberFormat } from '@helpers/utilities';

interface CardProps {
	title: string;
	desc: string;
	number?: number;
	icon: IconType;
	onPress: () => void;
	hideLoading?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, desc, number, icon, hideLoading, onPress }) => {
	if (!hideLoading && number === undefined) return <BlankStates.Type4 h={180} w={164} />;
	return (
		<Touchable onPress={onPress} w={164}>
			<Paper p="s">
				<IconBox icon={icon} bgc="background3" mb="xxs" />
				<Text type="lLarge" weight="semiBold">
					{title}
				</Text>
				<Text type="bDetail" color="text4" mb="xxs" width={127}>
					{desc}
				</Text>
				{number !== undefined && (
					<Text type="lMedium" weight="semiBold" color="text2">
						{numberFormat(number, 2)}
					</Text>
				)}
			</Paper>
		</Touchable>
	);
};
