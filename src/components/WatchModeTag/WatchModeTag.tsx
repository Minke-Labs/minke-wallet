/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useLanguage, useNavigation, useNetwork } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import styles from './WatchModeTag.styles';
import { WatchModeTagProps } from './WatchModeTag.types';

const WatchModeTag: React.FC<WatchModeTagProps> = ({ needToChangeNetwork }) => {
	const { i18n } = useLanguage();
	const { network } = useNetwork();
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate('ImportWalletScreen')} style={styles.left}>
				<Icon size={16} name="walletConnectStroke" />
				<Text type="span" style={{ marginLeft: 8 }}>
					{needToChangeNetwork
						? i18n.t('Components.WatchModeTag.this_wallet_needs_to_be_reconnected', {
								network: network.name
						  })
						: i18n.t('Components.WatchModeTag.import_wallet')}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default WatchModeTag;
