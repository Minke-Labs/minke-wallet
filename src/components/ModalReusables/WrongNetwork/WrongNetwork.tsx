import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import { whale4Img } from '@images';
import { useLanguage, useNetwork } from '@hooks';
import { networks } from '@models/network';
import styles from './WrongNetwork.styles';

const WrongNetwork = () => {
	const { i18n } = useLanguage();
	const { selectNetwork } = useNetwork();
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="bold" type="h3" marginBottom={12}>
					{i18n.t('Components.WrongNetwork.wrong_network')}
				</Text>
				<Text weight="regular" type="tSmall" color="text2" marginBottom={40}>
					{i18n.t('Components.WrongNetwork.please_change_network')}
				</Text>
				<Button
					title={i18n.t('Components.WrongNetwork.change_to_polygon')}
					onPress={() => selectNetwork(networks.matic)}
					marginBottom={40}
					mode="outlined"
				/>
			</View>
		</SafeAreaView>
	);
};

export default WrongNetwork;
