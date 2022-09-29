import React from 'react';
import { ScrollView, Image } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { Button, Header, Input, Text } from '@components';
import { useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { whale5Img as whaleImage } from '@images';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import useEnterReferralCodeScreen from './EnterReferralCodeScreen.hooks';
import styles from './EnterReferralCodeScreen.styles';

const EnterReferralCodeScreen = () => {
	RNUxcam.tagScreenName('EnterReferralCodeScreen');
	const {
		address,
		network: { topUpTokens }
	} = useGlobalWalletState();
	const [defaultToken] = topUpTokens;
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const { code, setCode, invalidCode, onConfirm, loading, disableCode } = useEnterReferralCodeScreen();

	return (
		<>
			<BasicLayout>
				<Header
					title={i18n.t('EnterReferralCodeScreen.enter_referral_code')}
					done
					onRightActionClick={() => (address ? navigation.navigate('HomeScreen') : navigation.goBack())}
				/>

				<ScrollView
					style={styles.padding}
					contentContainerStyle={{
						alignItems: 'center'
					}}
				>
					<Image source={whaleImage} style={styles.image} />
					<Text type="h2" weight="bold" style={styles.title} width={280} center mb="s">
						{i18n.t('EnterReferralCodeScreen.get_rewarded_for_saving_money')}
					</Text>
					{disableCode ? (
						<>
							<Text type="h2" weight="bold" style={styles.code} width={280} center mb="xl">
								{code}
							</Text>
							<Button
								onPress={() => navigation.navigate('AddFundsScreen', {})}
								title={i18n.t('EnterReferralCodeScreen.buy_token', { token: defaultToken.symbol })}
								mb="xxs"
							/>
						</>
					) : (
						<>
							<Input
								label={i18n.t('Components.Inputs.enter_code')}
								value={code}
								onChangeText={(t) => setCode(t)}
								autoCompleteType="off"
								error={code !== undefined && invalidCode}
								style={{ marginBottom: 32 }}
								autoCapitalize="characters"
							/>
							<Button
								title={
									loading
										? i18n.t('Components.Buttons.loading')
										: i18n.t('Components.Buttons.use_code')
								}
								disabled={invalidCode || loading}
								onPress={onConfirm}
								mb="xxs"
							/>
						</>
					)}

					<Text type="a" color="text3" weight="semiBold" center mb="xxs" width={293}>
						{i18n.t('EnterReferralCodeScreen.referral_note')}
					</Text>
				</ScrollView>
				<KeyboardSpacer />
			</BasicLayout>
		</>
	);
};

export default EnterReferralCodeScreen;
