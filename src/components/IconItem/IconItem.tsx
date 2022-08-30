import React from 'react';
import { SpacingType, IconType } from '@styles';
import IconBox from '@src/components/IconBox/IconBox';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Icon from '@src/components/Icon/Icon';
import Touchable from '@src/components/Touchable/Touchable';

interface IconItemProps {
	mb?: SpacingType;
	title: string;
	desc?: string;
	icon: IconType;
	alert?: boolean;
	rightButton?: boolean;
	newTab?: boolean;
	onPress: () => void;
	component?: JSX.Element;
}

const IconItem: React.FC<IconItemProps> = ({
	mb,
	title,
	desc,
	icon,
	alert,
	rightButton,
	newTab,
	component,
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
					{component && component}

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
