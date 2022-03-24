import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '@components';
import { useTheme } from '@hooks';
import { makeStyles } from './Failed.styles';
import { FailedProps } from './Failed.types';

export const Failed: React.FC<FailedProps> = ({ orderId, onFinish }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View>
			<View style={[styles.container, styles.failed]}>
				<Icon name="closeStroke" color="alert1" size={32} />
			</View>
			<Text type="h3" weight="extraBold" center width={275} marginBottom={24}>
				Oh no! Something has gone wrong. Please try again later or contact the support.
			</Text>
			<Text type="p" center width={275} marginBottom={40}>
				Reference: {orderId}
			</Text>
			<Button title="Ok, got it" onPress={onFinish} />
		</View>
	);
};
