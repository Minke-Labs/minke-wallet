import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from '@components';
import { SpacingType, IconType } from '@styles';

interface IconItemProps {
	mb?: SpacingType;
	title: string;
	desc: string;
	icon: IconType;
}

const IconItem: React.FC<IconItemProps> = ({ mb, title, desc, icon }) => (
	<View mb={mb}>
		<TouchableOpacity onPress={() => null}>
			<View row>
				<View
					h={40}
					w={40}
					br={2}
					bg="background2"
					main="center"
					cross="center"
					mr={3}
				>
					<Icon
						size={24}
						color="cta1"
						name={icon}
					/>
				</View>
				<View>
					<Text type="lLarge" weight="semiBold">
						{title}
					</Text>
					<Text type="bSmall" color="text4">
						{desc}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	</View>
);

export default IconItem;
