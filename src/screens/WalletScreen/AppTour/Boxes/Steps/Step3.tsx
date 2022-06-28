import React from 'react';
import { View } from 'react-native';
import { useLanguage } from '@hooks';
import { Text, Icon } from '@components';

export const Step3 = () => {
	const { i18n } = useLanguage();
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
					type="p" // Change to tMedium after new values come from merge.
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step3.send')}
				</Text>
			</View>
			<Text width={237} type="a">
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step3.send_tokens_to')}
			</Text>
		</>
	);
};
