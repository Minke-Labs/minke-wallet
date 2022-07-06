import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from '@components';
import { useLanguage } from '@hooks';
import { ProcessingProps } from './Processing.types';

export const Processing: React.FC<ProcessingProps> = ({ transactionHash, transfer = false }) => {
	const { i18n } = useLanguage();
	return (
		<View>
			<ActivityIndicator size="large" style={{ marginBottom: 24 }} />
			<Text type="h3" weight="extraBold" center width={275} marginBottom={24}>
				{transactionHash
					? i18n.t('TopUpWaitScreen.Processing.almost_there')
					: i18n.t(`TopUpWaitScreen.Processing.please_wait.${transfer ? 'transfer' : 'payment'}`)}
			</Text>
		</View>
	);
};
