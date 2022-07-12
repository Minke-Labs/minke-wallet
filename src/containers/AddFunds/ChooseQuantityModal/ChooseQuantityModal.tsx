import React from 'react';
import { View, FlatList, Platform } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Token, Text, PaperTouchable, ApplePayButton, Icon, OnrampButton } from '@components';
import { useLanguage } from '@hooks';
import { TokenType } from '@styles';
import { ChooseQuantityModalProps } from './ChooseQuantityModal.types';
import { useChooseQuantityModal } from './ChooseQuantityModal.hooks';

const ChooseQuantityModal: React.FC<ChooseQuantityModalProps> = ({
	coin,
	amount,
	setPresetAmount,
	enableCustomAmount,
	onPurchase,
	onClickBanxa
}) => {
	const { name, symbol, onCopyToClipboard, snackbarVisible, setSnackbarVisible } = useChooseQuantityModal({
		coin,
		setPresetAmount
	});
	const { i18n } = useLanguage();
	const showApplePay = Platform.OS === 'ios';
	return (
		<>
			<View>
				<View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
					<Token name={coin.image.toLowerCase() as TokenType} size={40} />
					<Text weight="extraBold" type="h3" style={{ marginLeft: 8 }}>
						{name}
					</Text>
				</View>
				<Text marginBottom={20}>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.buy_some', { symbol })}
					{showApplePay && (
						<>
							{i18n.t('Containers.AddFunds.ChooseQuantityModal.with')}
							<Text weight="extraBold"> Apple Pay</Text>
						</>
					)}
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.to_start_using')}
				</Text>
				{showApplePay && (
					<>
						<FlatList
							style={{ marginBottom: 20 }}
							contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
							keyExtractor={(item) => item.toString()}
							data={[100, 200, 300]}
							renderItem={({ item }) => (
								<PaperTouchable active={amount === item} onPress={() => setPresetAmount(item)}>
									<Text type="h3" weight="medium" color={amount === item ? 'text8' : 'text1'}>
										${item}
									</Text>
								</PaperTouchable>
							)}
							horizontal
							showsHorizontalScrollIndicator={false}
						/>
						<PaperTouchable marginBottom={20} onPress={enableCustomAmount}>
							<Text type="a">
								{i18n.t('Containers.AddFunds.ChooseQuantityModal.choose_another_amount')}
							</Text>
						</PaperTouchable>

						<ApplePayButton marginBottom={16} onPress={onPurchase} disabled={amount! <= 0} />
					</>
				)}
				<OnrampButton marginBottom={16} onPress={onClickBanxa} />

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 20
					}}
				>
					<View
						style={{
							width: 40,
							height: 40,
							backgroundColor: '#fff',
							borderRadius: 20,
							justifyContent: 'center',
							alignItems: 'center',
							marginRight: 12
						}}
					>
						<Icon name="addStroke" color="brand4" size={24} />
					</View>
					<Text weight="extraBold" type="h3">
						{i18n.t('Containers.AddFunds.ChooseQuantityModal.or_deposit')}
					</Text>
				</View>

				<Text marginBottom={20}>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.send_from')}
					<Text weight="extraBold">coinbase</Text>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.or_another_exchange')}
				</Text>

				<View style={{ marginBottom: 8 }}>
					<PaperTouchable onPress={onCopyToClipboard}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="copyStroke" style={{ marginRight: 8 }} size={16} />
							<Text>{i18n.t('Containers.AddFunds.ChooseQuantityModal.copy_address')}</Text>
						</View>
					</PaperTouchable>
				</View>
			</View>

			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text style={{ color: '#FFFFFF' }}>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.address_copied')}
				</Text>
			</Snackbar>
		</>
	);
};

export default ChooseQuantityModal;
