import React from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import {
	ApplePayButton,
	FiatCard,
	FullModal,
	Header,
	Modal,
	ModalReusables,
	OnrampButton,
	Text,
	TokenCard
} from '@components';
import { useLanguage, useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import RNUxcam from 'react-native-ux-cam';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { debounce } from 'lodash';
import WebView from 'react-native-webview';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';
import useAddFundsScreen from './AddFundsScreen.hooks';
import { makeStyles } from './AddFundsScreen.styles';

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
		disableBanxa,
		onOnrampPurchase,
		orderLink,
		setOrderLink
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
								autoFocus={false}
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
								autoFocus={false}
							/>
						</View>

						<DirectionButton loading={loadingPrices} disabled />
					</View>
					<View style={styles.buttons}>
						{showApplePay && (
							<ApplePayButton marginBottom={16} onPress={onApplePayPurchase} disabled={disableApplePay} />
						)}
						<OnrampButton
							marginBottom={24}
							currency={currency}
							onPress={onOnrampPurchase}
							disabled={disableBanxa}
						/>
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
			<FullModal visible={!!orderLink} onClose={() => setOrderLink('')}>
				<WebView
					source={{ uri: orderLink }}
					sharedCookiesEnabled
					onNavigationStateChange={(e) => {
						if (e.url.includes('#')) {
							setOrderLink('');
						}
					}}
				/>
			</FullModal>
		</>
	);
};

export default AddFundsScreen;