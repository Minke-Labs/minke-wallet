import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import Flag from '../Flag/Flag';
import Icon from '../Icon/Icon';
import Touchable from '../Touchable/Touchable';
import styles from './FlagItem.styles';
import { FlagItemProps } from './FlagItem.types';

const FlagItem: React.FC<FlagItemProps> = ({ flag, title, active, onPress }) => (
	<Touchable bc="text11" onPress={onPress} style={styles.container}>
		<View style={styles.leftContainer}>
			<Flag size={40} name={flag} />
			<Text style={{ marginLeft: 12 }} weight="bold" type="p2">
				{title}
			</Text>
		</View>
		{active && <Icon size={24} name="checkColor" />}
	</Touchable>
);

export default FlagItem;
