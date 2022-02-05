import React from 'react';
import { WelcomeLayout } from '@layouts';
import { Input } from '@components';
import { View } from 'react-native';
// import styles from './Test.styles';

const Test = () => (
	<WelcomeLayout>
		<View style={{ height: 300 }} />
		<Input />
	</WelcomeLayout>
);

export default Test;
