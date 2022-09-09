import React, { useState } from 'react';
import {
	Text,
	Paper,
	Icon, Token,
	Snackbar,
	View,
	Touchable
} from '@components';
import { useLanguage } from '@hooks';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { smallWalletAddress, ZapperSubtransaction } from '@models/wallet';
import { TokenType } from '@styles';
import { truncate } from '@src/hooks/useTransaction';

interface AddressesContainerProps {
	received: boolean;
	exchange: boolean;
	withdraw: boolean;
	deposit: boolean;
	value: number;
	source: string;
	formattedSource: string;
	sourceToken: ZapperSubtransaction | undefined;
	toToken: ZapperSubtransaction | undefined;
	fromAmount: number;
	hash: string;
	protocol: string;
}

export const AddressesContainer: React.FC<AddressesContainerProps> = ({
	received,
	exchange,
	withdraw,
	deposit,
	value,
	source,
	formattedSource,
	sourceToken,
	toToken,
	fromAmount,
	hash,
	protocol
}) => {
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	const { i18n } = useLanguage();

	const onCopyToClipboard = () => {
		Clipboard.setString(source);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	const onCopyHashToClipboard = () => {
		Clipboard.setString(hash);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};
	return (
		<>
			<Paper ph="s" pv="xs" mh="xs" mb="s">
				<>
					<Text type="lLarge" weight="semiBold">
						{i18n.t('TransactionScreen.hash')}
					</Text>

					<Touchable
						onPress={onCopyHashToClipboard}
						row
						w="100%"
						main="space-between"
						cross="center"
						mb="xs"
					>
						<Text type="lLarge" weight="regular" width={242}>
							{smallWalletAddress(hash, 12)}
						</Text>
						<Icon name="copy" size={20} color="text7" />
					</Touchable>

				</>
				{deposit || withdraw ? (
					<>
						<Text type="lLarge" weight="semiBold">
							{i18n.t('TransactionScreen.savings_account')}
						</Text>
						<View row cross="center">
							<Token name={protocol.toLowerCase() as TokenType} size={20} />
							<View mr="xxs" />
							<Text type="lLarge" weight="regular">
								{protocol}
							</Text>
						</View>
					</>
				) : exchange && toToken && sourceToken ? (
					<>
						<Text type="lLarge" weight="semiBold">
							{i18n.t('TransactionScreen.exchanged')}
						</Text>
						<View row main="space-between" cross="center" mb="xs">
							<Text type="lLarge" weight="regular">
								{i18n.t('TransactionScreen.exchange_details', {
									from: sourceToken.symbol,
									fromAmount,
									toAmount: value,
									to: toToken.symbol
								})}
							</Text>
						</View>
						<Text type="lLarge" weight="semiBold">
							{i18n.t('TransactionScreen.exchange_rate')}
						</Text>
						<View row main="space-between" cross="center">
							<Text type="lLarge" weight="regular">
								1 {sourceToken.symbol} = {truncate(toToken.amount / sourceToken.amount, 6)}{' '}
								{toToken.symbol}
							</Text>
						</View>
					</>
				) : (
					<>
						<Text type="lLarge" weight="semiBold">
							{received
								? i18n.t('TransactionScreen.received_from')
								: i18n.t('TransactionScreen.sent_to')}
						</Text>

						<Touchable
							onPress={onCopyToClipboard}
							row
							w="100%"
							main="space-between"
							cross="center"
						>
							<Text type="lLarge" weight="regular" width={242}>
								{formattedSource}
							</Text>
							<Icon name="copy" size={20} color="text7" />
						</Touchable>

					</>
				)}
			</Paper>
			<Snackbar
				onDismiss={() => setSnackbarVisible(false)}
				visible={snackbarVisible}
				title={i18n.t('Components.Snackbar.address_copied')}
			/>
		</>
	);
};
