import React from 'react';
import { ScrollView } from 'react-native';
import TransparentCard from '../TransparentCard/TransparentCard';

type DescTransparentCardProps = {
	fullHeight?: boolean;
	children: React.ReactNode;
};

const DescTransparentCard = ({ children, fullHeight = false }: DescTransparentCardProps) => (
	<TransparentCard mb="xs">
		<ScrollView style={{ height: fullHeight ? undefined : 250 }}>{children}</ScrollView>
	</TransparentCard>
);

export default DescTransparentCard;
