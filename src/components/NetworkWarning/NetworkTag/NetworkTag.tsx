import React from 'react';
import { View } from 'react-native';
import { useLanguage, useGlobalWalletState } from '@hooks';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import Touchable from '../../Touchable/Touchable';
import styles from './NetworkTag.styles';
import { NetworkTagProps } from './NetworkTag.types';

const NetworkTag: React.FC<NetworkTagProps> = ({ onPress, info }) => {
	const { network } = useGlobalWalletState();
	const { i18n } = useLanguage();
	return (
		<View style={[styles.container, { justifyContent: info ? 'space-between' : 'center' }]}>
			<View style={styles.left}>
				<Token size={16} token={{ symbol: network.id, address: '', decimals: 0 }} />
				<Text type="span" style={{ marginLeft: 8 }}>
					{i18n.t('Components.NetworkWarning.NetworkTag.sending_on', { network: network?.name })}
				</Text>
			</View>
			{info && (
				<Touchable onPress={onPress}>
					<Icon size={24} name="infoStroke" color="text7" />
				</Touchable>
			)}
		</View>
	);
};

export default NetworkTag;
