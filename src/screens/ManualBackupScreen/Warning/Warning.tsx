import { View } from 'react-native';
import React from 'react';
import { useTheme, useLanguage } from '@hooks';
import { Icon, Text } from '@components';
import styles from './Warning.styles';

const Warning = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();

	return (
		<View style={[styles.container, { borderColor: colors.alert6, backgroundColor: colors.background4 }]}>
			<Icon name="attention" size={24} color="alert6" style={{ marginRight: 8 }} />
			<View style={{ justifyContent: 'space-between' }}>
				<Text type="span" weight="bold">
					{i18n.t('ManualBackupScreen.Warning.minke_will_never_ask')}
				</Text>
				<Text type="span"> {i18n.t('ManualBackupScreen.Warning.anyone_who_has_these')}</Text>
			</View>
		</View>
	);
};

export default Warning;
