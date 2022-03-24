import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from '@components';
import { ProcessingProps } from './Processing.types';

export const Processing: React.FC<ProcessingProps> = ({ transactionHash, checking }) => (
	<View>
		<ActivityIndicator size="large" style={{ marginBottom: 24 }} />
		<Text type="h3" weight="extraBold" center width={275} marginBottom={24}>
			{transactionHash ?
				'Almost there... this might take a minute...' :
				`Please wait while we ${checking ? 'check' : 'process'} your payment...`}
		</Text>
		<Text type="p" center width={275}>
			{transactionHash && `Transaction: ${transactionHash}`}
		</Text>
	</View>
);