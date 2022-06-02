import React from 'react';
import { View } from 'react-native';
import { Snackbar } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => (
	<BasicLayout>
		<View style={{ flexDirection: 'row', marginTop: 160 }} />
		<Snackbar />
	</BasicLayout>
);

export default Test;
