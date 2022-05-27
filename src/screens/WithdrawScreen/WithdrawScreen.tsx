import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Card } from 'react-native-paper';
import { Icon, Modal, HapticButton, Text, TokenCard, ModalReusables } from '@components';
import { BasicLayout } from '@layouts';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import { tokenBalanceFormat } from '@helpers/utilities';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import { ParaswapToken } from '@models/token';
import GasSelector from '../ExchangeScreen/GasSelector/GasSelector';
import { makeStyles } from './WithdrawScreen.styles';
import Warning from '../ExchangeScreen/Warning/Warning';
import SearchTokens from '../ExchangeScreen/SearchTokens/SearchTokens';
import useWithdrawScreen from './WithdrawScreen.hooks';

const WithdrawScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const navigation = useNavigation();
	const {
		searchVisible,
		hideModal,
		showModal,
		token,
		tokenBalance,
		updateAmount,
		nativeToken,
		enoughForGas,
		canWithdraw,
		onTokenSelect,
		onWithdraw,
		waitingTransaction,
		transactionHash,
		tokens,
		gaslessEnabled,
		selectedProtocol,
		blockchainError,
		setBlockchainError
	} = useWithdrawScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<BasicLayout>
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.withdraw}>
					<View style={styles.withdrawHeadline}>
						<Text type="h3" weight="extraBold">
							{i18n.t('WithdrawScreen.withdraw')}
						</Text>
						{token && tokenBalance && (
							<Text type="a" weight="regular" color="text3">
								{i18n.t('WithdrawScreen.balance')}
								<Text type="a" weight="extraBold" color="text3">
									{tokenBalanceFormat(tokenBalance, 6)} {token.symbol}
								</Text>
							</Text>
						)}
					</View>
					<Card style={styles.tokenCard}>
						<TokenCard
							onPress={showModal}
							token={token}
							balance={tokenBalance}
							updateQuotes={debounce(updateAmount, 500)}
						/>
					</Card>
					<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
						<GasSelector />
					</View>
				</View>

				<View style={styles.withdrawButton}>
					{nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.withdraw')}
						disabled={!canWithdraw}
						onPress={onWithdraw}
					/>
				</View>
				<KeyboardSpacer />
			</BasicLayout>
			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={tokens?.map((t) => t.symbol.toLowerCase())}
					showOnlyOwnedTokens
					selected={[token?.symbol.toLowerCase()]}
					withdraw
				/>
			</Modal>
			<Modal isVisible={waitingTransaction} onDismiss={() => navigation.navigate('SaveScreen')}>
				{token && (
					<TransactionWaitModal
						onDismiss={() => navigation.navigate('SaveScreen')}
						fromToken={{ symbol: selectedProtocol?.name } as ParaswapToken}
						toToken={token!}
						transactionHash={transactionHash}
						withdraw
					/>
				)}
			</Modal>
			<Modal isVisible={blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</Modal>
		</>
	);
};

export default WithdrawScreen;
