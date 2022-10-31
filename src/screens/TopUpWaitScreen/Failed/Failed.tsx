import React from 'react';
import { View as RNView } from 'react-native';
import { Button, Icon, Text, View } from '@components';
import { useTheme, useLanguage } from '@hooks';
import { makeStyles } from './Failed.styles';
import { FailedProps } from './Failed.types';

export const Failed: React.FC<FailedProps> = ({ orderId, onFinish }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<RNView>
			<RNView style={[styles.container, styles.failed]}>
				<Icon name="close" color="alert1" size={32} />
			</RNView>
			<View w={275}>
				<Text type="h3" weight="extraBold" center marginBottom={24}>
					{i18n.t('TopUpWaitScreen.Failed.something_gone_wrong')}
				</Text>
				<Text type="p" center marginBottom={40}>
					{i18n.t('TopUpWaitScreen.Failed.reference')}
					{orderId}
				</Text>
				<Button title={i18n.t('Components.Buttons.ok_got_it')} onPress={onFinish} />
			</View>
		</RNView>
	);
};
