import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '@components';
import { useTheme } from '@hooks';
import i18n from '@localization';
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
				{i18n.t('TopUpWaitScreen.Failed.something_gone_wrong')}
			</Text>
			<Text type="p" center width={275} marginBottom={40}>
				{i18n.t('TopUpWaitScreen.Failed.reference')}{orderId}
			</Text>
			<Button
				title={i18n.t('Components.Buttons.ok_got_it')}
				onPress={onFinish}
			/>
		</View>
	);
};
