import React from 'react';
import { Image } from 'react-native';
import { View, Text, Icon, Paper, Touchable } from '@components';
import { IconType } from '@styles';
import Metamask from './metamask.png';
import Rainbow from './rainbow.png';
import Twt from './twt.png';

interface ItemProps {
	title: string;
	icon: IconType;
	onPress: () => void;
	first?: boolean;
}

export const Item: React.FC<ItemProps> = ({ title, icon, onPress, first }) => (
	<Touchable onPress={onPress}>
		<View row cross="center" mb="m">
			<Paper br="xxs" p="xxs" mr="xs">
				<Icon name={icon} size={24} color="cta1" />
			</Paper>
			<Text type="lLarge" weight="semiBold">
				{title}
			</Text>
			{first && (
				<View row pl="xxs">
					<Image source={Metamask} />
					<View mr="xxs" />
					<Image source={Rainbow} />
					<View mr="xxs" />
					<Image source={Twt} />
				</View>
			)}
		</View>
	</Touchable>
);
