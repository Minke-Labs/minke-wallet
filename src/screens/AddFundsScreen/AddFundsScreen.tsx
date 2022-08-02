import React from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { FiatCard, Header, Modal, ModalReusables, Text, TokenCard } from '@components';
import { useLanguage, useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import RNUxcam from 'react-native-ux-cam';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { debounce } from 'lodash';
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
		selectToken
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
								updateQuotes={debounce(updateFiat, 500)}
								onPress={openCurrencySearch}
								disableAmountValidation
							/>
						</View>
						<View style={styles.bottom}>
							<Text type="lSmall" weight="semiBold" color="text1">
								{i18n.t('AddFundsScreen.you_receive')}
							</Text>
							<TokenCard
								updateQuotes={() => console.log('Update quotes TOKEN')}
								token={token}
								onPress={openTokenSearch}
								disableMax
								exchange
								disableAmountValidation
							/>
						</View>

						<DirectionButton loading={loadingPrices} disabled />
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
		</>
	);
};

export default AddFundsScreen;
