import React from 'react';
import { Switch } from 'react-native';
import { Header, Icon, Text, View } from '@components';
import { useLanguage } from '@hooks';
import { BasicLayout } from '@layouts';
import useSecurityScreen from './SecurityScreen.hooks';

const SecurityScreen = () => {
	const { i18n } = useLanguage();
	const { toggleSwitch, authenticationDisabled } = useSecurityScreen();

	return (
		<BasicLayout>
			<Header title={i18n.t('SecurityScreen.title')} done />
			<View ph="xs">
				<View row cross="center" main="space-between">
					<View row cross="center">
						<Icon name="attention" size={24} style={{ marginRight: 8 }} color="alert6" />
						<Text type="lLarge" weight="semiBold" color="cta4">
							{i18n.t('SecurityScreen.disable_authentication')}
						</Text>
					</View>
					<Switch onValueChange={toggleSwitch} value={authenticationDisabled} />
				</View>
				<Text type="lSmall" weight="semiBold" color="text4" style={{ marginLeft: 32 }}>
					{i18n.t('SecurityScreen.disable_auth_text')}
				</Text>
			</View>
		</BasicLayout>
	);
};

export default SecurityScreen;
