import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useLanguage, useNavigation } from '@hooks';
import { os } from '@styles';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import {
	Button,
	ModalBase,
	ModalReusables,
	Header,
	TokenCard,
	BlankStates,
	View,
	ExchangeContainer,
	Flag,
	Text,
	TokenInputInner
} from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNUxcam from 'react-native-ux-cam';
import { useOffRampSendScreen } from './OffRampSendScreen.hooks';

const OffRampSendScreen = () => {
	RNUxcam.tagScreenName('OffRampSendScreen');
	const navigation = useNavigation();

	const {
		fromToken,
		toToken,
		fromConversionAmount,
		// toConversionAmount,
		// canChangeDirections,
		// directionSwap,
		showModalFrom,
		// showModalTo,
		hideModal,
		onTokenSelect,
		// goToExchangeResume,
		canSwap,
		// loadingPrices,
		searchVisible,
		showOnlyOwnedTokens,
		updateFromQuotes,
		// updateToQuotes,
		// enoughForGas,
		ownedTokens,
		error,
		setError
		// gasless
	} = useOffRampSendScreen({});
	const { i18n } = useLanguage();

	if (fromToken === undefined) {
		return <BlankStates.Type1 title={i18n.t('Components.BlankStates.Exchange')} />;
	}

	return (
		<>
			<BasicLayout>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
					<Header
						onPress={() => navigation.goBack()}
						title="Send"
						mb="m"
					/>

					<ExchangeContainer
						upperComponent={
							<>
								<Text type="lSmall" weight="semiBold" mb="xxs">
									You sell
								</Text>
								<TokenCard
									updateQuotes={debounce(updateFromQuotes, 500)}
									conversionAmount={fromConversionAmount}
									token={fromToken}
									onPress={showModalFrom}
									exchange
								/>
							</>
						}
						lowerComponent={
							<>
								<Text type="lSmall" weight="semiBold" mb="xxs">
									Get in your bank
								</Text>
								<View w="100%" mb="xs" row cross="center">
									<Flag size={28} name="australia" />
									<View mr="xxs" />
									<Text type="lLarge" weight="semiBold">
										Australian Dollar
									</Text>
								</View>
								<View row>
									<TokenInputInner
										symbol=""
										isAmountValid
										placeholder="0.00"
										autoFocus
										showSymbol
										amount="0"
										onChangeText={() => null}
										ghost
										marginBottom={0}
										editable={false}
									/>
								</View>
							</>
						}
						disabled
					/>

					<View mh="xs" mb="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
						<Button
							title="Sell"
							onPress={() => null}
							disabled={!canSwap()}
						/>
					</View>
					<KeyboardSpacer />
				</TouchableOpacity>
			</BasicLayout>

			<ModalBase isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={ownedTokens}
					showOnlyOwnedTokens={showOnlyOwnedTokens}
					selected={[fromToken?.symbol?.toLowerCase(), toToken?.symbol?.toLowerCase()]}
				/>
			</ModalBase>
			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
		</>
	);
};

export default OffRampSendScreen;
