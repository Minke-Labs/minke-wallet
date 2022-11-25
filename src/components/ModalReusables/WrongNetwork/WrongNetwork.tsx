import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import { whale4Img } from '@images';
import { useLanguage } from '@hooks';
import styles from './WrongNetwork.styles';
import { WrongNetworkParams } from './WrongNetwork.types';

const WrongNetwork = ({ onDismiss, description, onUpdate }: WrongNetworkParams) => {
	const { i18n } = useLanguage();

	const onPress = async () => {
		if (onUpdate) {
			onUpdate();
		}
	};

	return (
		<SafeAreaView>
			<ModalHeader onDismiss={onDismiss} />

			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="bold" type="h3" mb="xs">
					{i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.wrong_network')}
				</Text>
				<Text weight="regular" type="tSmall" color="text2" mb="l">
					{description}
				</Text>
				<Button
					title={i18n.t('ReferralScreen.RedeemScreen.Modals.WrongNetwork.change_to_network')}
					onPress={onPress}
					mb="l"
					mode="outlined"
				/>
			</View>
		</SafeAreaView>
	);
};

export default WrongNetwork;
