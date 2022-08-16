import React from 'react';
import { View } from '@components';
import { spacing } from '@styles';
import BasicLayout from '../BasicLayout/BasicLayout';
import ValueBox from './ValueBox/ValueBox';
import { AssetsLayoutProps } from './AssetsLayout.types';

const AssetsLayout: React.FC<AssetsLayoutProps> = ({ children, headerValue, headerTitle }) => (
	<BasicLayout hideSafeAreaView bg="detail4">
		<ValueBox value={headerValue} title={headerTitle} />
		<View
			bg="background1"
			style={{
				borderTopLeftRadius: spacing[4],
				borderTopRightRadius: spacing[4],
				flex: 1
			}}
		>
			{children}
		</View>
	</BasicLayout>
);

export default AssetsLayout;
