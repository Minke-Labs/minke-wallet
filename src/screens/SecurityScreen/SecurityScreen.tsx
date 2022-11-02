import React from 'react';
import { Switch } from 'react-native';
import { Header, IconBox, Text, View } from '@components';
import { useLanguage } from '@hooks';
import { BasicLayout } from '@layouts';
import useSecurityScreen from './SecurityScreen.hooks';

const SecurityScreen = () => {
	const { i18n } = useLanguage();
	const { toggleSwitch, authenticationEnabled } = useSecurityScreen();

	return (
		<BasicLayout>
			<Header title={i18n.t('SecurityScreen.title')} done />
			<View ph="xs">
				<View row cross="center" main="space-between">
					<View row cross="center">
						<IconBox icon="key" bgc="background2" />
						<Text type="lLarge" weight="semiBold" color="cta4" width={200}>
							{i18n.t('SecurityScreen.require_biometric')}
						</Text>
					</View>
					<Switch onValueChange={toggleSwitch} value={authenticationEnabled} />
				</View>
			</View>
		</BasicLayout>
	);
};

export default SecurityScreen;
