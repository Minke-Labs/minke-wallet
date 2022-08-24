import React from 'react';
import { truncate } from '@src/hooks/useTransaction';
import Text from '../../Text/Text';
import View from '../../View/View';
import Icon from '../../Icon/Icon';

interface TagProps {
	perc: number;
}

export const Tag: React.FC<TagProps> = ({ perc }) => (
	<View row cross="center">
		<Icon name={perc > 0 ? 'up' : 'down'} size={12} color={perc > 0 ? 'alert3' : 'alert1'} />
		<View mr="xxxs" />
		<Text type="lSmall" weight="semiBold" color={perc > 0 ? 'alert3' : 'alert1'}>
			{truncate(perc, 2)}%
		</Text>
	</View>
);
