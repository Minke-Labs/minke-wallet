import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import { whale4Img } from '@images';
import { useLanguage, useNetwork } from '@hooks';
import { networks } from '@models/network';
import styles from './WrongNetwork.styles';

const WrongNetwork = ({ onDismiss }: { onDismiss: () => void }) => {
	const { i18n } = useLanguage();
	const { selectNetwork } = useNetwork();
	return (
		<SafeAreaView>
			<ModalHeader onDismiss={onDismiss} />

			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="bold" type="h3" marginBottom={12}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.wrong_network')}
				</Text>
				<Text weight="regular" type="tSmall" color="text2" marginBottom={40}>
					{i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.please_change_network')}
				</Text>
				<Button
					title={i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.change_to_polygon')}
					onPress={() => selectNetwork(networks.matic)}
					marginBottom={40}
					mode="outlined"
				/>
			</View>
		</SafeAreaView>
	);
};

export default WrongNetwork;
