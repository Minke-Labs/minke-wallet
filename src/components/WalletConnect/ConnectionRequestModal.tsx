import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { useGlobalWalletState, useLanguage } from '@hooks';
import { smallWalletAddress } from '@models/wallet';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import View from '../View/View';
import Icon from '../Icon/Icon';
import Token from '../Token/Token';
import { TokenType } from '@styles';

const ConnectionRequestModal = () => {
	const { i18n } = useLanguage();
	const {
		address,
		network: { name, nativeToken }
	} = useGlobalWalletState();
	return (
		<SafeAreaView>
			<View pv="xl" ph="s">
				<Text weight="bold" type="tMedium" mb="s">
					{i18n.t('Components.ConnectionRequestModal.connection_request_from')}
				</Text>
				<View row mb="s" cross="center">
					<View>
						<Image
							width={50}
							height={50}
							source={{ uri: 'https://example.walletconnect.org/favicon.ico' }}
							style={{
								width: 50,
								height: 50,
								borderRadius: 100
							}}
						/>
					</View>

					<View ml="xs" bw={2} flex1>
						<Text numberOfLines={1}>WalletConnect Example</Text>
						<Text numberOfLines={1}>https://example.walletconnect.org</Text>
					</View>
				</View>
				<View row mb="s" cross="center" main="space-between">
					<View>
						<Text weight="semiBold" type="lMedium" color="text4">
							{i18n.t('Components.ConnectionRequestModal.switch_wallet')}
						</Text>
						<View row cross="center" main="space-between">
							<Text weight="semiBold" type="lMedium">
								{smallWalletAddress(address)}
							</Text>
							<Icon name="chevronDown" color="cta1" size={16} />
						</View>
					</View>
					<View>
						<Text weight="semiBold" type="lMedium" color="text4">
							{i18n.t('Components.ConnectionRequestModal.switch_network')}
						</Text>
						<View row cross="center" main="space-between">
							<Token name={nativeToken.symbol.toLowerCase() as TokenType} size={24} />
							<Text weight="semiBold" type="lMedium">
								{name}
							</Text>
							<Icon name="chevronDown" color="cta1" size={16} />
						</View>
					</View>
				</View>
				<Button title={i18n.t('Components.ConnectionRequestModal.connect')} />
			</View>
		</SafeAreaView>
	);
};

export default ConnectionRequestModal;
