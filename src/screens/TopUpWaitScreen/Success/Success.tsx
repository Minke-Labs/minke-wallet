import React from 'react';
import { View as RNView } from 'react-native';
import { Button, Icon, Text, View } from '@components';
import { useTheme, useLanguage } from '@hooks';
import { SuccessProps } from './Success.types';
import { makeStyles } from './Success.styles';

export const Success: React.FC<SuccessProps> = ({ onFinish }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<RNView>
			<RNView style={[styles.container, styles.success]}>
				<Icon name="checkColor" color="alert3" size={32} />
			</RNView>
			<View w={275}>
				<Text type="h3" weight="extraBold" center marginBottom={40} width={275}>
					{i18n.t('TopUpWaitScreen.Success.funds_being_deposited')}
				</Text>
				<Button title={i18n.t('TopUpWaitScreen.Success.done')} onPress={onFinish} />
			</View>
		</RNView>
	);
};
