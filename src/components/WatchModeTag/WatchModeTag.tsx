/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { useLanguage, useNavigation } from '@hooks';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import { WatchModeTagProps } from './WatchModeTag.types';

const WatchModeTag: React.FC<WatchModeTagProps> = ({ needToChangeNetwork, network }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();

	return (
		<View row w="100%" main="center" cross="center">
			<Touchable
				row
				main="space-between"
				cross="center"
				onPress={() => navigation.navigate('ImportWalletScreen')}
			>
				<Icon size={16} name="walletConnectStroke" />
				<View mr="xxs" />
				<Text type="span">
					{needToChangeNetwork
						? i18n.t('Components.WatchModeTag.this_wallet_needs_to_be_reconnected', {
								network: network.name
						  })
						: i18n.t('Components.WatchModeTag.import_wallet')}
				</Text>
			</Touchable>
		</View>
	);
};

export default WatchModeTag;
