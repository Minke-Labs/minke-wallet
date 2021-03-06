import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import Flag from '../Flag/Flag';
import Icon from '../Icon/Icon';
import styles from './FlagItem.styles';
import { FlagItemProps } from './FlagItem.types';

const FlagItem: React.FC<FlagItemProps> = ({ flag, title, active, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, { borderColor: colors.text11 }]}>
			<View style={styles.leftContainer}>
				<Flag size={40} name={flag} />
				<Text style={{ marginLeft: 12 }} weight="bold" type="p2">
					{title}
				</Text>
			</View>
			{active && <Icon size={24} name="checkColor" />}
		</TouchableOpacity>
	);
};

export default FlagItem;
