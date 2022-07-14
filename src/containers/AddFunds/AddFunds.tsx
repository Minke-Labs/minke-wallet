/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { WebView } from 'react-native-webview';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader, ModalReusables, FullModal } from '@components';
import CoinSelectorModal from './CoinSelectorModal/CoinSelectorModal';
import ChooseQuantityModal from './ChooseQuantityModal/ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal/CustomAmountModal';
import LocalCurrencyModal from './LocalCurrencyModal/LocalCurrencyModal';
import { useAddFunds } from './AddFunds.hooks';
import { AddFundsProps } from './AddFunds.types';
import { SelectorModal } from '../SelectorModal/SelectorModal';
import { ExternalExchangeModal } from '../ExternalExchangeModal/ExternalExchangeModal';

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
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
		goBack,
		dismissCoin,
		setPresetAmount,
		onApplePayPurchase,
		onOnrampPurchase,
		enableCustomAmount,
		setCustomAmount,
		banxaModalVisible,
		setBanxaModalVisible,
		gaslessEnabled
	} = useAddFunds({ visible, onDismiss });

	const handleGoBack = () => {
		if (currentStep === 1) {
			dismissCoin();
		}
		if (currentStep === 4) {
			setCurrentStep(2);
			return;
		}
		goBack();
	};

	return (
		<SafeAreaView>
			<ModalHeader
				onBack={() => setCurrentStep(0)}
				// onBack={currentStep === 2 && gaslessEnabled ? undefined : handleGoBack}
				onDismiss={dismissCoin}
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
								onBuy={() => setCurrentStep(1)}
								onExchange={() => setCurrentStep(10)}
							/>
						)}
						{currentStep === 1 && <CoinSelectorModal onSelect={selectCoin} />}
						{currentStep === 2 && (
							<ChooseQuantityModal
								coin={coin}
								amount={amount}
								setPresetAmount={setPresetAmount}
								enableCustomAmount={enableCustomAmount}
								onPurchase={() => onApplePayPurchase(amount || 100)}
								onClickBanxa={() => setCurrentStep(3)}
							/>
						)}
						{currentStep === 3 && (
							<CustomAmountModal
								customAmount={customAmount}
								setCustomAmount={setCustomAmount}
								customAmountRef={customAmountRef}
								onPurchase={() => onApplePayPurchase(customAmount || 100)}
							/>
						)}
						{currentStep === 4 && (
							<LocalCurrencyModal onOnramp={(val) => onOnrampPurchase(val === 0 ? amount || 100 : val)} />
						)}

						{currentStep === 10 && (
							<ExternalExchangeModal />
						)}
					</>
				)}
			</View>

			<FullModal visible={banxaModalVisible} onClose={() => setBanxaModalVisible(false)}>
				<WebView
					source={{
						uri: orderLink
					}}
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
