import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import { useFetchCurrentNetwork } from '@hooks';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import styles from './NetworkTag.styles';
import { NetworkTagProps } from './NetworkTag.types';

const NetworkTag: React.FC<NetworkTagProps> = ({ onPress }) => {
	const network = useFetchCurrentNetwork();

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Token size={16} name={network?.id as TokenType} />
				<Text type="span" style={{ marginLeft: 8 }}>
					Sending on the Polygon network
				</Text>
			</View>
			<TouchableOpacity {...{ onPress }}>
				<Icon size={24} name="infoStroke" color="text7" />
			</TouchableOpacity>
		</View>
	);
};

export default NetworkTag;
