import React from 'react';
import { View, FlatList, Platform, TouchableOpacity } from 'react-native';
import { Token, Text, PaperTouchable, ApplePayButton, Flag, OnrampButton } from '@components';
import { useLanguage, useTheme, useCountry } from '@hooks';
import { TokenType, allCountries, FlagType } from '@styles';
import { ChooseQuantityModalProps } from './ChooseQuantityModal.types';
import { useChooseQuantityModal } from './ChooseQuantityModal.hooks';

const Item: React.FC<{ onPress: () => void }> = ({ onPress }) => {
	const { i18n } = useLanguage();
	const { country } = useCountry();
	const foundCountry = allCountries.find((c) => c.flag === country);
	const flag = foundCountry?.flag as FlagType;
	return (
		<View style={{ flexDirection: 'row' }}>
			{flag && <Flag size={40} name={flag} />}
			<TouchableOpacity onPress={onPress} style={{ marginLeft: 12, flex: 1 }}>
				<View>
					<Text type="bSmall" weight="bold">
						{foundCountry?.name}
					</Text>
					<Text type="bSmall" marginBottom={16}>
						{i18n.t('Containers.AddFunds.ChooseQuantityModal.select_country')}
					</Text>

					<Text type="lLarge" weight="semiBold" color="cta1">
						{i18n.t('Containers.AddFunds.ChooseQuantityModal.change_country')}
					</Text>
				</View>
			</TouchableOpacity>
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
		symbol
	} = useChooseQuantityModal({ coin, setPresetAmount });
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const showApplePay = Platform.OS === 'ios';
	return (
		<>
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
					<OnrampButton marginBottom={24} onPress={onClickBanxa} />
				</>
			)}

			<View style={{ height: 1, borderWidth: 1, borderColor: colors.detail2, marginBottom: 24 }} />

			<Item onPress={onChangeCountry} />
		</>
	);
};

export default ChooseQuantityModal;
