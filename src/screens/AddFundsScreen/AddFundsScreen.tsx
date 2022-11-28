import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import {
	ApplePayButton,
	FiatCard,
	GenericPayButton,
	Header,
	ModalBase,
	ModalReusables,
	NetworkWarning,
	OnrampButton,
	Text,
	TokenCard,
	View
} from '@components';
import { useLanguage, useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import RNUxcam from 'react-native-ux-cam';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { debounce } from 'lodash';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import useAddFundsScreen from './AddFundsScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AddFundsScreen'>;
const AddFundsScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('AddFundsScreen');
	const { topupToken } = route.params;
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const {
		currency,
		selectCurrency,
		currencySearchVisible,
		openCurrencySearch,
		dismissCurrencySearch,
		loadingPrices,
		updateFiat,
		token,
		tokenSearchVisible,
		openTokenSearch,
		dismissTokenSearch,
		topUpTokens,
		selectToken,
		tokenAmount,
		updateToken,
		fiatAmount,
		error,
		setError,
		disableApplePay,
		onApplePayPurchase,
		disableBanxa,
		onOnrampBanxaPurchase,
		useApplePay,
		useBanxa,
		useMoonpay,
		disableMoonPay,
		onMoonpayPurchase,
		moonPaySpecialButton,
		network
	} = useAddFundsScreen(topupToken);

	return (
		<>
			<BasicLayout>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
					<Header title={i18n.t('AddFundsScreen.header')} marginBottom="m" />

					<View bgc="background5" br="xs" mh="xs" mb="s" main="center" cross="center">
						<View
							ph="xs"
							pt="xs"
							pb="s"
							w="100%"
							style={{
								borderBottomWidth: 1,
								borderBottomColor: colors.background1
							}}
						>
							<Text type="lSmall" weight="semiBold" color="text1" mb="xxs">
								{i18n.t('AddFundsScreen.you_pay')}
							</Text>
							<FiatCard
								currency={currency}
								updateQuotes={debounce(updateFiat, 800)}
								onPress={openCurrencySearch}
								conversionAmount={fiatAmount}
								disableAmountValidation
								autoFocus={false}
							/>
						</View>

						<View ph="xs" pb="xs" pt="s" w="100%">
							<Text type="lSmall" weight="semiBold" color="text1" mb="xxs">
								{i18n.t('AddFundsScreen.you_receive')}
							</Text>
							<TokenCard
								updateQuotes={debounce(updateToken, 800)}
								token={token}
								onPress={openTokenSearch}
								conversionAmount={tokenAmount}
								disableMax
								exchange
								disableAmountValidation
								autoFocus={false}
							/>
						</View>

						<DirectionButton loading={loadingPrices} disabled />
					</View>

					<View mh="xs" mb="xs">
						<NetworkWarning.Tag network={network} />
					</View>
					<View mh="xs" mb="xs">
						{!!useApplePay && (
							<ApplePayButton marginBottom={16} onPress={onApplePayPurchase} disabled={disableApplePay} />
						)}
						{!!useMoonpay && (
							<>
								{moonPaySpecialButton ? (
									<>
										{!useApplePay && (
											<GenericPayButton
												disabled={disableMoonPay}
												marginBottom={16}
												onPress={onMoonpayPurchase}
											/>
										)}
										<OnrampButton
											marginBottom={16}
											currency={currency}
											onPress={onMoonpayPurchase}
											disabled={disableMoonPay}
										/>
									</>
								) : (
									<GenericPayButton
										disabled={disableMoonPay}
										marginBottom={16}
										onPress={onMoonpayPurchase}
										showAppleGooglePay={!useApplePay}
									/>
								)}
							</>
						)}

						{!!useBanxa && (
							<>
								{!useApplePay && !useMoonpay && (
									<GenericPayButton
										disabled={disableMoonPay}
										marginBottom={16}
										onPress={onMoonpayPurchase}
									/>
								)}
								<OnrampButton
									marginBottom={16}
									currency={currency}
									onPress={onOnrampBanxaPurchase}
									disabled={disableBanxa}
								/>
							</>
						)}
					</View>

					<KeyboardSpacer />
				</TouchableOpacity>
			</BasicLayout>
			<ModalBase isVisible={currencySearchVisible} onDismiss={dismissCurrencySearch}>
				<ModalReusables.SearchCurrencies
					visible={currencySearchVisible}
					onDismiss={dismissCurrencySearch}
					onCurrencySelect={selectCurrency}
					selected={currency}
				/>
			</ModalBase>
			<ModalBase isVisible={tokenSearchVisible} onDismiss={dismissTokenSearch}>
				<ModalReusables.SearchTokens
					visible={tokenSearchVisible}
					onDismiss={dismissTokenSearch}
					onTokenSelect={selectToken}
					ownedTokens={topUpTokens}
					showOnlyOwnedTokens
					selected={[`${token?.address.toLowerCase()}-${token?.chainId}`]}
				/>
			</ModalBase>
			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
		</>
	);
};

export default AddFundsScreen;
