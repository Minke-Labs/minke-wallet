import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, IconBox } from '@components';
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
				<IconBox icon={icon} />
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
