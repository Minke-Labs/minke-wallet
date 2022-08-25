import React from 'react';
import { SpacingType, IconType } from '@styles';
import IconBox from '../IconBox/IconBox';
import Text from '../Text/Text';
import View from '../View/View';
import Icon from '../Icon/Icon';
import Touchable from '../Touchable/Touchable';

interface IconItemProps {
	mb?: SpacingType;
	title: string;
	desc?: string;
	icon: IconType;
	alert?: boolean;
	rightButton?: boolean;
	newTab?: boolean;
	onPress: () => void;
}

const IconItem: React.FC<IconItemProps> = ({
	mb,
	title,
	desc,
	icon,
	alert,
	rightButton,
	newTab,
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
