import React from 'react';
import { WebView } from 'react-native-webview';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader, ModalReusables, FullModal } from '@components';
import { useLanguage } from '@hooks';
import ChooseQuantityModal from './ChooseQuantityModal/ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal/CustomAmountModal';
import LocalCurrencyModal from './LocalCurrencyModal/LocalCurrencyModal';
import CountryModal from './CountryModal/CountryModal';
import { useAddFunds } from './AddFunds.hooks';
import { AddFundsProps } from './AddFunds.types';
import { SelectorModal } from '../SelectorModal/SelectorModal';
import { ExternalExchangeModal } from '../ExternalExchangeModal/ExternalExchangeModal';

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
	const { i18n } = useLanguage();
	const {
		coin,
		amount,
		customAmount,
		customAmountRef,
		currentStep,
		setCurrentStep,
		wyreError,
		error,
		orderLink,
		selectCoin,
		dismissError,
		dismissCoin,
		setPresetAmount,
		onApplePayPurchase,
		onOnrampPurchase,
		enableCustomAmount,
		setCustomAmount,
		banxaModalVisible,
		setBanxaModalVisible
	} = useAddFunds({ visible, onDismiss });

	return (
		<SafeAreaView>
			<ModalHeader
				onBack={() => setCurrentStep(currentStep === 4 ? 1 : 0)}
				onDismiss={dismissCoin}
				title={currentStep === 4 ? i18n.t('Containers.AddFunds.Header.country') : ''}
			/>
			<View style={{ paddingHorizontal: 24 }}>
				{wyreError && error ? (
					<ModalReusables.Error
						title={error.title}
						description={error.description}
						onDismiss={dismissError}
						showHeader={false}
					/>
				) : (
					<>
						{currentStep === 0 && (
							<SelectorModal
								onBuy={selectCoin}
								onExchange={() => setCurrentStep(10)}
							/>
						)}
						{currentStep === 1 && (
							<ChooseQuantityModal
								coin={coin}
								amount={amount}
								setPresetAmount={setPresetAmount}
								enableCustomAmount={enableCustomAmount}
								onPurchase={() => onApplePayPurchase(amount || 100)}
								onClickBanxa={() => setCurrentStep(3)}
								onChangeCountry={() => setCurrentStep(4)}
							/>
						)}
						{currentStep === 2 && (
							<CustomAmountModal
								customAmount={customAmount}
								setCustomAmount={setCustomAmount}
								customAmountRef={customAmountRef}
								onPurchase={() => onApplePayPurchase(customAmount || 100)}
							/>
						)}
						{currentStep === 3 && (
							<LocalCurrencyModal onOnramp={(val) => onOnrampPurchase(val === 0 ? amount || 100 : val)} />
						)}
						{currentStep === 4 && (
							<CountryModal />
						)}
						{currentStep === 10 && (
							<ExternalExchangeModal />
						)}
					</>
				)}
			</View>

			<FullModal visible={banxaModalVisible} onClose={() => setBanxaModalVisible(false)}>
				<WebView
					source={{ uri: orderLink }}
					sharedCookiesEnabled
					onNavigationStateChange={(e) => {
						if (e.url.includes('#')) {
							setBanxaModalVisible(false);
						}
					}}
				/>
			</FullModal>
		</SafeAreaView>
	);
};

export default AddFunds;
