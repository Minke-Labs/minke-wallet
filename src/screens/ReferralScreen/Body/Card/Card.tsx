import React from 'react';
import { Text, View, Touchable } from '@components';
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({
	title,
	subtitle,
	image,
	right,
	onPress,
	mb = 's',
	thirdRowText
}) => (
	<Touchable mb={mb} onPress={onPress}>
		<View row main="space-between" cross="center">
			<View row cross="center">
				{image}
				<View ml="xxs">
					<Text type="tSmall" weight="semiBold">
						{title}
					</Text>
					<Text type="bSmall" color="text4">
						{subtitle}
					</Text>
					{!!thirdRowText && (
						<Text color="text2">
							{thirdRowText}
						</Text>
					)}
				</View>
			</View>
			{right}
		</View>
	</Touchable>
);

export default Card;
