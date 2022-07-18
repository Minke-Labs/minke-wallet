import React from 'react';
import { View, FlatList, Platform, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { Token, Text, PaperTouchable, ApplePayButton, Flag, OnrampButton } from '@components';
import { useLanguage, useTheme, useCountry } from '@hooks';
import { TokenType, allCountries, FlagType } from '@styles';
import { ChooseQuantityModalProps } from './ChooseQuantityModal.types';
import { useChooseQuantityModal } from './ChooseQuantityModal.hooks';

const Item: React.FC<{ onPress: () => void }> = ({ onPress }) => {
	const { country } = useCountry();
	const foundCountry = allCountries.find((c) => c.flag === country);
	const flag = foundCountry?.flag as FlagType;
	return (
		<View style={{ flexDirection: 'row' }}>
			{ flag && <Flag size={40} name={flag} /> }
			<View style={{ marginLeft: 12, flex: 1 }}>
				<Text type="bSmall" weight="bold">{foundCountry?.name}</Text>
				<Text type="bSmall" marginBottom={16}>
					Select you country of residence to access your local payments option
				</Text>

				<TouchableOpacity onPress={onPress}>
					<Text
						type="lLarge"
						weight="semiBold"
						color="cta1"
					>
						Change country
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const ChooseQuantityModal: React.FC<ChooseQuantityModalProps> = ({
	coin,
	amount,
	setPresetAmount,
	enableCustomAmount,
	onPurchase,
	onClickBanxa,
	onChangeCountry
}) => {
	const {
		name,
		symbol,
		// onCopyToClipboard,
		snackbarVisible,
		setSnackbarVisible
	} = useChooseQuantityModal({ coin, setPresetAmount });
	const { i18n } = useLanguage();
	const { colors } = useTheme();
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
						<OnrampButton
							marginBottom={24}
							onPress={onClickBanxa}
						/>
					</>
				)}

				<View style={{ height: 1, borderWidth: 1, borderColor: colors.detail2, marginBottom: 24 }} />

				<Item onPress={onChangeCountry} />

				{/* <View
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
				</View> */}

				{/* <Text marginBottom={20}>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.send_from')}
					<Text weight="extraBold">coinbase</Text>
					{i18n.t('Containers.AddFunds.ChooseQuantityModal.or_another_exchange')}
				</Text> */}

				{/* <View style={{ marginBottom: 8 }}>
					<PaperTouchable onPress={onCopyToClipboard}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="copyStroke" style={{ marginRight: 8 }} size={16} />
							<Text>{i18n.t('Containers.AddFunds.ChooseQuantityModal.copy_address')}</Text>
						</View>
					</PaperTouchable>
				</View> */}
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
