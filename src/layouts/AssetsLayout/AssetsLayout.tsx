import React from 'react';
import { View } from '@components';
import { spacing } from '@styles';
import BasicLayout from '../BasicLayout/BasicLayout';
import ValueBox from './ValueBox/ValueBox';
import { AssetsLayoutProps } from './AssetsLayout.types';

const AssetsLayout: React.FC<AssetsLayoutProps> = ({ children, headerValue, headerTitle }) => (
	<BasicLayout hideSafeAreaView bgc="detail4">
		<ValueBox value={headerValue} title={headerTitle} />
		<View
			bgc="background1"
			style={{
				borderTopLeftRadius: spacing.s,
				borderTopRightRadius: spacing.s,
				flex: 1
			}}
		>
			{children}
		</View>
	</BasicLayout>
);

export default AssetsLayout;
