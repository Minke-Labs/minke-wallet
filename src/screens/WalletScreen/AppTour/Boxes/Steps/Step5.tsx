import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import { useLanguage } from '@hooks';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

const Button: React.FC<{ onPress: () => void }> = ({ onPress }) => (
	<TouchableOpacity
		style={{
			flexDirection: 'row',
			justifyContent: 'flex-end',
			alignItems: 'center'
		}}
		onPress={onPress}
	>
		<Text
			type="lMedium"
			weight="semiBold"
			color="cta1"
			style={{ marginRight: 8 }}
		>
			Finish
		</Text>
		<Icon name="checkmark" size={20} color="cta1" />
	</TouchableOpacity>
);

export const Step5 = () => {
	const { i18n } = useLanguage();
	const { dismiss, type, setType } = useContext(AppTourContext);
	return (
		<>
			<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
				<Icon
					name="sendStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="tMedium"
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step3.send')}
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step3.send_tokens_to')}
			</Text>

			<View style={{ height: 25, flexDirection: 'row' }}>
				<Icon
					name="exchangeStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="tMedium"
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step4.exchange')}
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step4.swap')}
			</Text>

			<View style={{ height: 25, flexDirection: 'row' }}>
				<Icon
					name="receiveStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="tMedium"
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step5.receive')}
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step5.copy_your')}
			</Text>

			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Arrow left onPress={() => setType(type - 1 as AppTourStepType)} />
				<Button onPress={dismiss} />
			</View>
		</>
	);
};
