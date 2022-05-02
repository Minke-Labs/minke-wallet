import React from 'react';
import { View } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text } from '@components';
import i18n from '@localization';

const Test = () => (
	<BasicLayout>
		<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
			<Text>
				{i18n.t('welcome')} {i18n.t('name')}
			</Text>
		</View>
	</BasicLayout>
);

export default Test;
