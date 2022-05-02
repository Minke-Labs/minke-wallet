import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '@components';
import { useTheme } from '@hooks';
import i18n from '@localization';
import { SuccessProps } from './Success.types';
import { makeStyles } from './Success.styles';

export const Success: React.FC<SuccessProps> = ({ onFinish }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View>
			<View style={[styles.container, styles.success]}>
				<Icon name="checkColor" color="alert3" size={32} />
			</View>
			<Text type="h3" weight="extraBold" center marginBottom={40} width={275}>
				{i18n.t('TopUpWaitScreen.Success.funds_being_deposited')}
			</Text>
			<Button title="Done" onPress={onFinish} />
		</View>
	);
};
