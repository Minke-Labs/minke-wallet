import React from 'react';
import { View } from '@components';
import BasicLayout from '../BasicLayout/BasicLayout';
import ValueBox from './ValueBox/ValueBox';
import { AssetsLayoutProps } from './AssetsLayout.types';

const AssetsLayout: React.FC<AssetsLayoutProps> = ({ children, headerValue, headerTitle }) => (
	<BasicLayout hideSafeAreaView bgc="detail4">
		<ValueBox value={headerValue} title={headerTitle} />
		<View bgc="background1" btlr="s" btrr="s" flex1>
			{children}
		</View>
	</BasicLayout>
);

export default AssetsLayout;
