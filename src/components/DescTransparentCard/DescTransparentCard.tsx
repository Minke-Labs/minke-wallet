import React from 'react';
import { ScrollView } from 'react-native';
import TransparentCard from '../TransparentCard/TransparentCard';

const DescTransparentCard: React.FC = ({ children }) => (
	<TransparentCard marginBottom={16}>
		<ScrollView style={{ height: 250 }}>
			{children}
		</ScrollView>
	</TransparentCard>
);

export default DescTransparentCard;
