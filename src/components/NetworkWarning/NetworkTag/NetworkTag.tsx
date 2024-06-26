/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { View } from 'react-native';
import { useLanguage, useGlobalWalletState } from '@hooks';
import Token from '../../Token/Token';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import Touchable from '../../Touchable/Touchable';
import styles from './NetworkTag.styles';
import { NetworkTagProps } from './NetworkTag.types';

const NetworkTag: React.FC<NetworkTagProps> = ({ onPress, info, network, buying = false }) => {
	const { network: settingsNetwork } = useGlobalWalletState();
	const { i18n } = useLanguage();
	const selectedNetwork = network || settingsNetwork;

	return (
		<View style={[styles.container, { justifyContent: info ? 'space-between' : 'center' }]}>
			<View style={styles.left}>
				<Token size={16} token={{ symbol: selectedNetwork.id, address: '', decimals: 0, chainId: 0 }} />
				<Text type="span" style={{ marginLeft: 8 }}>
					{buying
						? i18n.t('Components.NetworkWarning.NetworkTag.buying_on', {
								network: selectedNetwork.name
						  })
						: i18n.t('Components.NetworkWarning.NetworkTag.sending_on', {
								network: selectedNetwork.name
						  })}
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
