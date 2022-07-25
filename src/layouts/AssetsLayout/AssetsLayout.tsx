import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import BasicLayout from '../BasicLayout/BasicLayout';
import ValueBox from './ValueBox/ValueBox';
import styles from './AssetsLayout.styles';
import { AssetsLayoutProps } from './AssetsLayout.types';

const AssetsLayout: React.FC<AssetsLayoutProps> = ({ children, headerValue, headerTitle }) => {
	const { colors } = useTheme();
	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<ValueBox
				value={headerValue}
				title={headerTitle}
			/>
			<View style={[styles.container, { backgroundColor: colors.background1 }]}>
				{children}
			</View>
		</BasicLayout>
	);
};

export default AssetsLayout;
