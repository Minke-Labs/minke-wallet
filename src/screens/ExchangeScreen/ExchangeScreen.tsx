import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import { useTheme, useLanguage, useKeyboard } from '@hooks';
import { os } from '@styles';
import { debounce } from 'lodash';
import { BasicLayout } from '@layouts';
import {
	Button,
	ModalBase,
	ModalReusables,
	Header,
	GasSelector,
	TokenCard,
	BlankStates,
	Warning,
	View
} from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNUxcam from 'react-native-ux-cam';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useExchangeScreen } from './ExchangeScreen.hooks';
import DirectionButton from './DirectionButton/DirectionButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ExchangeScreen'>;
const ExchangeScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('ExchangeScreen');
	const { sourceToken, destToken } = route.params || {};
	const { colors } = useTheme();
	const {
		fromToken,
		toToken,
		fromConversionAmount,
		toConversionAmount,
		canChangeDirections,
		directionSwap,
		showModalFrom,
		showModalTo,
		hideModal,
		onTokenSelect,
		goToExchangeResume,
		canSwap,
		loadingPrices,
		searchVisible,
		showOnlyOwnedTokens,
		updateFromQuotes,
		updateToQuotes,
		enoughForGas,
		ownedTokens,
		error,
		setError,
		gasless
	} = useExchangeScreen({ sourceToken, destToken });
	const { i18n } = useLanguage();
	const keyboardVisible = useKeyboard();

	if (fromToken === undefined) {
		return <BlankStates.Type1 title={i18n.t('Components.BlankStates.Exchange')} />;
	}

	return (
		<>
			<BasicLayout>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
					<Header title={i18n.t('ExchangeScreen.exchange')} marginBottom={36} />

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
							<TokenCard
								updateQuotes={debounce(updateFromQuotes, 500)}
								conversionAmount={fromConversionAmount}
								token={fromToken}
								onPress={showModalFrom}
								exchange
							/>
						</View>

						<View ph="xs" pb="xs" pt="s" w="100%">
							<TokenCard
								updateQuotes={debounce(updateToQuotes, 500)}
								conversionAmount={toConversionAmount}
								token={toToken}
								onPress={showModalTo}
								disableMax
								exchange
								disableAmountValidation
							/>
						</View>

						<DirectionButton
							onPress={directionSwap}
							loading={loadingPrices}
							disabled={!canChangeDirections}
						/>
					</View>

					<View style={{ display: keyboardVisible ? 'none' : 'flex' }}>
						<View mb="s" style={{ display: gasless ? 'none' : 'flex' }}>
							<GasSelector />
						</View>

						<View mh="xs">
							{!enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
						</View>
					</View>

					<View mh="xs" mb="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
						<Button
							title={i18n.t('ExchangeScreen.review')}
							onPress={goToExchangeResume}
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

export default ExchangeScreen;
