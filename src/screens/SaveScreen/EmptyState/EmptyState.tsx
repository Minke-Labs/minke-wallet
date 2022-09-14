import React from 'react';
import { Text, Button } from '@components';
import { useNavigation, useDepositProtocols, useLanguage } from '@hooks';
import { SaveLayout } from '@layouts';
import { View } from 'react-native';
import { Tag } from './Tag/Tag';

const EmptyState = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { selectedProtocol, apy } = useDepositProtocols();

	return (
		<SaveLayout>
			<Text type="h3" weight="extraBold" color="text1" marginBottom={16} center>
				{i18n.t('SaveScreen.EmptyState.open_savings_account', {
					protocol: selectedProtocol?.name
				})}
			</Text>

			<Text type="p2" color="text3" marginBottom={32}>
				{i18n.t('SaveScreen.EmptyState.lets_make_first_deposit')}
			</Text>

			{!!apy && <Tag apy={apy} />}

			<View style={{ paddingHorizontal: 16, width: '100%' }}>
				<Button
					iconLeft="add"
					title={i18n.t('Components.Buttons.deposit')}
					onPress={() => navigation.navigate('DepositScreen')}
				/>
			</View>
		</SaveLayout>
	);
};

export default EmptyState;
