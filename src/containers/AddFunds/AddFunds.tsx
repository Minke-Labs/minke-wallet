import React from 'react';
import { WebView } from 'react-native-webview';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader, ModalReusables, FullModal } from '@components';
import CoinSelectorModal from './CoinSelectorModal/CoinSelectorModal';
import ChooseQuantityModal from './ChooseQuantityModal/ChooseQuantityModal';
import CustomAmountModal from './CustomAmountModal/CustomAmountModal';
import { useAddFunds } from './AddFunds.hooks';
import { AddFundsProps } from './AddFunds.types';

const AddFunds: React.FC<AddFundsProps> = ({ visible = false, onDismiss }) => {
	const {
		coin,
		amount,
		customAmount,
		customAmountRef,
		currentStep,
		wyreError,
		error,
		gaslessEnabled,
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
		setBanxaModalVisible
	} = useAddFunds({ visible, onDismiss });

	return (
		<SafeAreaView>
			<ModalHeader onBack={currentStep > 0 && !gaslessEnabled ? goBack : undefined} onDismiss={dismissCoin} />
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
						{currentStep === 0 && !gaslessEnabled && <CoinSelectorModal onSelect={selectCoin} />}
						{currentStep === 1 && (
							<ChooseQuantityModal
								coin={coin}
								amount={amount}
								setPresetAmount={setPresetAmount}
								enableCustomAmount={enableCustomAmount}
								onPurchase={() => onApplePayPurchase(amount || 100)}
								onOnramp={() => onOnrampPurchase(amount || 100)}
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
					</>
				)}
			</View>
			<FullModal
				visible={banxaModalVisible}
				onClose={() => setBanxaModalVisible(false)}
			>
				<WebView
					source={{ uri: 'https://www.minke.app' }}
					sharedCookiesEnabled
				/>
			</FullModal>
		</SafeAreaView>
	);
};

export default AddFunds;
