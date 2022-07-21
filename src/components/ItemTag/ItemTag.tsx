import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import Icon from '../Icon/Icon';
import { ItemTagProps } from './ItemTag.types';
import styles from './ItemTag.styles';

const ItemTag: React.FC<ItemTagProps> = ({
	iconName,
	tagColor = 'background2',
	tagType = 'icon',
	SvgComponent
}) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors[tagColor] }]}>
			{
				tagType === 'icon' && (
					<Icon
						name={iconName}
						size={24}
						color="cta1"
					/>
				)
			}
			{ SvgComponent && tagType === 'svg' && <SvgComponent /> }
		</View>
	);
};

export default ItemTag;
