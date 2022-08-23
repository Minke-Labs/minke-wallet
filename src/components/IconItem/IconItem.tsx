import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SpacingType, IconType } from '@styles';
import IconBox from '../IconBox/IconBox';
import Text from '../Text/Text';
import View from '../View/View';

interface IconItemProps {
	mb?: SpacingType;
	title: string;
	desc: string;
	icon: IconType;
	alert?: boolean;
	onPress: () => void;
}

const IconItem: React.FC<IconItemProps> = ({ mb, title, desc, icon, alert, onPress }) => (
	<View mb={mb}>
		<TouchableOpacity onPress={onPress}>
			<View row>
				<IconBox icon={icon} bgc="background2" alert={alert} />
				<View>
					<Text type="lLarge" weight="semiBold" color={alert ? 'alert1' : 'text1'}>
						{title}
					</Text>
					<Text type="bSmall" color={alert ? 'alert1' : 'text4'}>
						{desc}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	</View>
);

export default IconItem;
