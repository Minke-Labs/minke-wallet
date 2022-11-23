import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import { useLanguage } from '@hooks';
import { Input, Touchable, View } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface SettingsModalProps {
	onDismiss?: () => void;
	onSlippageChanges: (value: number) => void;
	slippageValue: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onDismiss, slippageValue, onSlippageChanges }) => {
	const { i18n } = useLanguage();
	const [slippage, setSlippage] = React.useState(slippageValue || '5');
	const value = Number(slippage);
	const error = Number.isNaN(value) || value < 0 || value > 100;

	useEffect(() => {
		if (!error) {
			onSlippageChanges(value / 100);
		}
	}, [value]);

	return (
		<SafeAreaView>
			{!!onDismiss && <ModalHeader onDismiss={onDismiss} />}
			<View ph="s" mb="m">
				<Text type="hMedium" weight="extraBold" marginBottom={24}>
					{i18n.t('ExchangeScreen.settings')}
				</Text>
				<Text type="lMedium" weight="semiBold" color="text3" marginBottom={16}>
					{i18n.t('ExchangeScreen.SettingsModal.max_slippage')}
				</Text>
				<Input
					label={i18n.t('Components.Inputs.slippage_tolerance')}
					value={slippage}
					onChangeText={(t) => setSlippage(t)}
					autoCompleteType="off"
					error={error}
					style={{ marginBottom: 16 }}
					keyboardType="numeric"
					extraText="%"
				/>
				<View row cross="center" main="space-between" mb="xs">
					{['1.0', '2.0', '5.0'].map((n) => (
						<View pv="xxs" key={n} flex1>
							<Touchable onPress={() => setSlippage(Number(n).toString())}>
								<Text type="lSmall" weight="semiBold" center color="text1">
									{n}%
								</Text>
							</Touchable>
						</View>
					))}
				</View>
				<Button
					title={i18n.t('ExchangeScreen.SettingsModal.done')}
					onPress={onDismiss}
					mb="xxs"
					disabled={error}
				/>
				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SettingsModal;
