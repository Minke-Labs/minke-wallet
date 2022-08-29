import React from 'react';
import { TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { BasicLayout } from '@layouts';
import { Button, Icon, Input, Text } from '@components';
import { useLanguage, useNavigation } from '@hooks';
import { whale5Img as whaleImage } from '@images';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import useEnterReferralCodeScreen from './EnterReferralCodeScreen.hooks';
import styles from './EnterReferralCodeScreen.styles';

const EnterReferralCodeScreen = () => {
	const { address } = useState(globalWalletState()).value;
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const {
		code,
		setCode,
		invalidCode,
		onConfirm,
		loading,
		disableCode
	} = useEnterReferralCodeScreen();

	return (
		<>
			<BasicLayout>
				<View style={[styles.row, styles.header]}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()} style={styles.row}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
						<Text weight="extraBold" type="h3">
							{i18n.t('EnterReferralCodeScreen.enter_referral_code')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => (address ? navigation.navigate('HomeScreen') : navigation.goBack())}
					>
						<Icon name="close" color="text7" size={24} />
					</TouchableOpacity>
				</View>

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
								onPress={() => navigation.navigate('AddFundsScreen')}
								title={i18n.t('EnterReferralCodeScreen.buy_usdc')}
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
