import React from 'react';
import { View } from 'react-native';
import { Text, ModalHeader, MStableReusables } from '@components';

const MStable: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => (
	<MStableReusables.Background coinTop={180}>
		<View style={{ width: '100%', height: '100%' }}>
			<ModalHeader onDismiss={onDismiss} />
			<View style={{ paddingHorizontal: 16 }}>
				<Text marginBottom={16} type="hSmall" weight="bold">mStable savings account</Text>
				<MStableReusables.Info marginBottom={48} />
			</View>
		</View>
	</MStableReusables.Background>
);

export default MStable;
