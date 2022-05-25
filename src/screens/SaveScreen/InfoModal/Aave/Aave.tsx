import React from 'react';
import { View } from 'react-native';
import { Text, ModalHeader, AaveReusables } from '@components';

const Aave: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
	<AaveReusables.Background ghostTop={220}>
		<View style={{ width: '100%', height: '100%' }}>
			<ModalHeader onDismiss={onDismiss} />
			<View style={{ paddingHorizontal: 16 }}>
				<Text marginBottom={16} type="hSmall" weight="bold">Aave savings account</Text>
				<AaveReusables.Info marginBottom={48} />
			</View>
		</View>
	</AaveReusables.Background>
);

export default Aave;
