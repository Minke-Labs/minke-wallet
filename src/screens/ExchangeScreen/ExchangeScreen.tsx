import { debounce } from 'lodash';
import React from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNUxcam from 'react-native-ux-cam';

import {
	BlankStates, Button, GasSelector, Header, Icon, ModalBase, ModalReusables, Text, TokenCard,
	Touchable, View, Warning, WatchModeTag
} from '@components';
import { useKeyboard, useLanguage, useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import gasLimits from '@models/gas';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { os } from '@styles';

import DirectionButton from './DirectionButton/DirectionButton';
import { useExchangeScreen } from './ExchangeScreen.hooks';
import SettingsModal from './SettingsModal/SettingsModal';

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
		gasless,
		canSendTransactions,
		needToChangeNetwork,
		searchSource,
		settingsModalVisible,
		dismissSettingsModal,
		showSettingsModal,
		onSlippageChanges,
		slippage,
		network
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
					<Header title={i18n.t('ExchangeScreen.exchange')} marginBottom="m" />

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

					<View mh="xs" mb="xs" row cross="center" main="space-between">
						<View flex1>
							<Touchable
								bgc="background5"
								bc={canChangeDirections ? 'cta1' : 'detail2'}
								bw={1}
								br="s"
								row
								main="center"
								pv="xxs"
								disabled={!canChangeDirections}
								onPress={directionSwap}
							>
								<View mr="xxs">
									<Text
										type="lSmall"
										weight="semiBold"
										color={canChangeDirections ? 'cta1' : 'detail2'}
									>
										{i18n.t('ExchangeScreen.flip')}
									</Text>
								</View>
								<Icon name="swapCurrency" color={canChangeDirections ? 'cta1' : 'detail2'} size={16} />
							</Touchable>
						</View>
						<View mh="xxs" />
						<View flex1>
							<Touchable
								bgc="background5"
								bc="cta1"
								bw={1}
								br="s"
								row
								main="center"
								pv="xxs"
								onPress={showSettingsModal}
							>
								<View mr="xxs">
									<Text type="lSmall" weight="semiBold" color="cta1">
										{i18n.t('ExchangeScreen.settings')}
									</Text>
								</View>
								<Icon name="gear" color="cta1" size={16} />
							</Touchable>
						</View>
					</View>

					<View style={{ display: keyboardVisible ? 'none' : 'flex' }}>
						<View mb="s" style={{ display: gasless ? 'none' : 'flex' }}>
							<GasSelector gasLimit={gasLimits.exchange} network={network} />
						</View>

						<View mh="xs">
							{!enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
						</View>
					</View>

					<View mh="xs" mb="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
						{!canSendTransactions && (
							<View mb="xxs">
								<WatchModeTag needToChangeNetwork={needToChangeNetwork} network={network} />
							</View>
						)}
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
					selected={[
						`${fromToken?.address.toLowerCase()}-${fromToken?.chainId}`,
						`${toToken?.address.toLowerCase()}-${toToken?.chainId}`
					]}
					enableSections={searchSource === 'to'}
					chainId={searchSource === 'to' && fromToken ? fromToken.chainId : undefined}
				/>
			</ModalBase>
			<ModalBase isVisible={!!error} onDismiss={() => setError('')}>
				<ModalReusables.Error onDismiss={() => setError('')} description={error} />
			</ModalBase>
			<ModalBase isVisible={settingsModalVisible} onDismiss={dismissSettingsModal}>
				<SettingsModal
					onDismiss={dismissSettingsModal}
					slippageValue={((slippage || 0.05) * 100).toString()}
					onSlippageChanges={onSlippageChanges}
				/>
			</ModalBase>
		</>
	);
};

export default ExchangeScreen;
