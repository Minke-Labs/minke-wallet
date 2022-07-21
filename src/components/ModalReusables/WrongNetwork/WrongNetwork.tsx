import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import { whale4Img } from '@images';
import { useLanguage, useNetwork } from '@hooks';
import { Network } from '@models/network';
import styles from './WrongNetwork.styles';
import { WrongNetworkParams } from './WrongNetwork.types';

const WrongNetwork = ({ onDismiss, network, description, onUpdate }: WrongNetworkParams) => {
	const { i18n } = useLanguage();
	const { selectNetwork } = useNetwork();

	const onPress = async (ntw: Network) => {
		await selectNetwork(ntw);
		if (onUpdate) {
			onUpdate();
		}
	};

	return (
		<SafeAreaView>
			<ModalHeader onDismiss={onDismiss} />

			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="bold" type="h3" marginBottom={12}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.wrong_network')}
				</Text>
				<Text weight="regular" type="tSmall" color="text2" marginBottom={40}>
					{description}
				</Text>
				<Button
					title={i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.change_to_network', {
						network: network.name
					})}
					onPress={() => onPress(network)}
					marginBottom={40}
					mode="outlined"
				/>
			</View>
		</SafeAreaView>
	);
};

export default WrongNetwork;
