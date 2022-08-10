import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import { useNetwork, useLanguage } from '@hooks';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import styles from './NetworkTag.styles';
import { NetworkTagProps } from './NetworkTag.types';

const NetworkTag: React.FC<NetworkTagProps> = ({ onPress, info, title }) => {
	const { network } = useNetwork();
	const { i18n } = useLanguage();
	return (
		<View style={[styles.container, { justifyContent: info ? 'space-between' : 'center' }]}>
			<View style={styles.left}>
				<Token size={16} name={network?.id as TokenType} />
				<Text type="span" style={{ marginLeft: 8 }}>
					{title}{' '}
					{i18n.t('Components.NetworkWarning.NetworkTag.sending_on', { network: network?.name })}
				</Text>
			</View>
			{info && (
				<TouchableOpacity {...{ onPress }}>
					<Icon size={24} name="infoStroke" color="text7" />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default NetworkTag;
