import React from 'react';
import { Keyboard, SafeAreaView, TouchableOpacity, View } from 'react-native';
import {
	ApplePayButton,
	FiatCard,
	Flag,
	Header,
	Modal,
	ModalHeader,
	ModalReusables,
	Text,
	TokenCard
} from '@components';
import { useLanguage, useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import RNUxcam from 'react-native-ux-cam';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { debounce } from 'lodash';
import CountryModal from '@src/containers/AddFunds/CountryModal/CountryModal';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import { makeStyles } from './AddFundsScreen.styles';
import useAddFundsScreen from './AddFundsScreen.hooks';

const AddFundsScreen = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
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
		showApplePay,
		disableApplePay,
		onApplePayPurchase,
		countrySearchVisible,
		openCountrySearch,
		dismissCountrySearch,
		country
	} = useAddFundsScreen();
	RNUxcam.tagScreenName('AddFundsScreen');

	return (
		<>
			<BasicLayout>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
					<Header title={i18n.t('AddFundsScreen.header')} marginBottom={36} />

					<View style={styles.container}>
						<View style={styles.top}>
							<Text type="lSmall" weight="semiBold" color="text1" marginBottom={8}>
								{i18n.t('AddFundsScreen.you_pay')}
							</Text>
							<FiatCard
								currency={currency}
								updateQuotes={debounce(updateFiat, 800)}
								onPress={openCurrencySearch}
								conversionAmount={fiatAmount}
								disableAmountValidation
							/>
						</View>
						<View style={styles.bottom}>
							<Text type="lSmall" weight="semiBold" color="text1">
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
							/>
						</View>

						<DirectionButton loading={loadingPrices} disabled />
					</View>
					{!!country && (
						<View style={[styles.buttons, { flexDirection: 'row' }]}>
							<Flag size={40} name={country?.flag} />
							<TouchableOpacity onPress={openCountrySearch} style={{ marginLeft: 12, flex: 1 }}>
								<View>
									<Text type="bSmall" weight="bold">
										{country.name}
									</Text>
									<Text type="bSmall" marginBottom={16}>
										{i18n.t('Containers.AddFunds.ChooseQuantityModal.select_country')}
									</Text>

									<Text type="lLarge" weight="semiBold" color="cta1">
										{i18n.t('Containers.AddFunds.ChooseQuantityModal.change_country')}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
					<View style={styles.buttons}>
						{showApplePay && (
							<ApplePayButton marginBottom={16} onPress={onApplePayPurchase} disabled={disableApplePay} />
						)}
					</View>
					<KeyboardSpacer />
				</TouchableOpacity>
			</BasicLayout>
			<Modal isVisible={currencySearchVisible} onDismiss={dismissCurrencySearch}>
				<ModalReusables.SearchCurrencies
					visible={currencySearchVisible}
					onDismiss={dismissCurrencySearch}
					onCurrencySelect={selectCurrency}
					selected={currency}
				/>
			</Modal>
			<Modal isVisible={tokenSearchVisible} onDismiss={dismissTokenSearch}>
				<ModalReusables.SearchTokens
					visible={tokenSearchVisible}
					onDismiss={dismissTokenSearch}
					onTokenSelect={selectToken}
					ownedTokens={topUpTokens}
					showOnlyOwnedTokens
					selected={[token?.symbol.toLowerCase()]}
				/>
			</Modal>
			<Modal isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</Modal>
			<Modal isVisible={countrySearchVisible} onDismiss={dismissCountrySearch}>
				<SafeAreaView>
					<ModalHeader
						onDismiss={dismissCountrySearch}
						title={i18n.t('Containers.AddFunds.Header.country')}
					/>
					<View style={{ paddingHorizontal: 24 }}>
						<CountryModal onCountrySelected={dismissCountrySearch} />
					</View>
				</SafeAreaView>
			</Modal>
		</>
	);
};

export default AddFundsScreen;
