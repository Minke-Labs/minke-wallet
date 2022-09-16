/* eslint-disable max-len */
import React from 'react';
import { Image } from 'react-native';
import { OffRampImg } from '@images';
import { View, Text, Header } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { NewBankButton } from './NewBankButton/NewBankButton';

const SendToBankScreen = () => {
	const navigation = useNavigation();
	return (
		<BasicLayout>
			<Header
				onPress={() => navigation.goBack()}
				title="Sell"
				mb="m"
			/>
			<View cross="center" ph="xs">
				<Image
					source={OffRampImg}
					style={{ width: 277, height: 216 }}
				/>
				<View mb="xs" />

				<Text type="hSmall" weight="bold" mb="xxs">
					Send funds back to your bank
				</Text>

				<View mh="xs" mb="m" w="100%">
					<Text type="bSmall" center>
						Easily sell your crypto and send back to your preferred bank account with Minke. Just provide your bank details and we will take care of the rest.
					</Text>
				</View>

				<NewBankButton
					onPress={() => navigation.navigate('OffRampBankFormScreen')}
				/>

			</View>
		</BasicLayout>
	);
};

export default SendToBankScreen;
