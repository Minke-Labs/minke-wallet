import React from 'react';
import { View } from 'react-native';
import { Button, Icon, Text } from '@components';
import { useTheme } from '@hooks';
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
				Your funds have been added to your wallet!
			</Text>
			<Button title="Done" onPress={onFinish} />
		</View>
	);
};
