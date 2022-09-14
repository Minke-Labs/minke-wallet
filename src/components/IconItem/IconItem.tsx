import React from 'react';
import { Image } from 'react-native';
import { SpacingType, IconType } from '@styles';
import IconBox from '@src/components/IconBox/IconBox';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Icon from '@src/components/Icon/Icon';
import Touchable from '@src/components/Touchable/Touchable';
import Metamask from './metamask.png';
import Rainbow from './rainbow.png';
import Twt from './twt.png';

interface IconItemProps {
	mb?: SpacingType;
	title: string;
	desc?: string;
	icon: IconType;
	alert?: boolean;
	rightButton?: boolean;
	newTab?: boolean;
	onPress: () => void;
	images?: boolean;
}

const Images = () => (
	<View row pl="xxs" cross="center">
		<Image source={Metamask} />
		<View mr="xxs" />
		<Image source={Twt} />
		<View mr="xxs" />
		<Image source={Rainbow} />
	</View>
);

const IconItem: React.FC<IconItemProps> = ({
	mb,
	title,
	desc,
	icon,
	alert,
	rightButton,
	newTab,
	images,
	onPress
}) => (
	<View mb={mb}>
		<Touchable onPress={onPress}>
			<View row main="space-between" cross="center">
				<View row cross="center">
					<IconBox icon={icon} bgc="background2" alert={alert} />
					<View>
						<Text type="lLarge" weight="semiBold" color={alert ? 'alert1' : 'text1'}>
							{title}
						</Text>
						{!!desc && (
							<Text type="bSmall" color={alert ? 'alert1' : 'text4'}>
								{desc}
							</Text>
						)}
					</View>
					{images && <Images />}

				</View>
				{rightButton && (
					<Icon
						name="chevronRight"
						size={24}
						color={alert ? 'alert1' : 'cta1'}
					/>
				)}
				{newTab && (
					<Icon
						name="openInNew"
						size={24}
						color={alert ? 'alert1' : 'cta1'}
					/>
				)}
			</View>
		</Touchable>
	</View>
);

export default IconItem;
