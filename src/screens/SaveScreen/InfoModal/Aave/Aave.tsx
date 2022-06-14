import React from 'react';
import { View } from 'react-native';
import { Text, ModalHeader, AaveReusables } from '@components';
import { useLanguage } from '@hooks';

const Aave: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
	const { i18n } = useLanguage();

	return (
		<AaveReusables.Background ghostTop={220}>
			<View style={{ width: '100%', height: '100%' }}>
				<ModalHeader onDismiss={onDismiss} />
				<View style={{ paddingHorizontal: 16 }}>
					<Text marginBottom={16} type="hSmall" weight="bold">
						{i18n.t('SaveScreen.InfoModal.Aave')}
					</Text>
					<AaveReusables.Info marginBottom={48} />
				</View>
			</View>
		</AaveReusables.Background>
	);
};

export default Aave;
