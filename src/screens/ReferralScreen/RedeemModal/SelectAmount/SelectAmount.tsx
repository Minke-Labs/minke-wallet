import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text, TokenCard } from '@components';
import { useLanguage, useTheme } from '@hooks';
import DirectionButton from '@src/screens/ExchangeScreen/DirectionButton/DirectionButton';
import { debounce } from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { makeStyles } from './SelectAmount.styles';
import useRedeemModalHooks from '../RedeemModal.hooks';

const SelectAmount = ({ points }: { points: number }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { fromToken, toToken, loading, conversionAmount, canSwap, updateFromQuotes } = useRedeemModalHooks(points);

	return (
		<>
			<Text type="h3" weight="bold" style={{ width: '100%' }} marginBottom={8}>
				{i18n.t('ReferralScreen.Modals.RedeemModal.select_the_amount_to_redeem')}
			</Text>
			<View style={styles.container}>
				<View style={styles.top}>
					<TokenCard updateQuotes={debounce(updateFromQuotes, 500)} token={fromToken} exchange notTouchable />
				</View>
				<View style={styles.bottom}>
					<TokenCard
						token={toToken}
						conversionAmount={conversionAmount}
						disableAmountValidation
						disableMax
						exchange
						oneSideExchange
						notTouchable
					/>
				</View>

				<DirectionButton loading={loading} disabled />
			</View>
			<View style={styles.buttonBox}>
				{loading ? (
					<ActivityIndicator />
				) : (
					<Button
						title={i18n.t('ReferralScreen.Modals.RedeemModal.swap')}
						onPress={() => console.log('Swap')}
						disabled={!canSwap}
					/>
				)}
			</View>
			<KeyboardSpacer />
		</>
	);
};

export default SelectAmount;
