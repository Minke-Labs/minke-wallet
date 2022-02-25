import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, ModalHeader, PaperTouchable, Icon } from '@components';
import { useNavigation } from '@hooks';

const NotAbleToSaveModal = ({ onDismiss }: { onDismiss: () => void }) => {
	const navigation = useNavigation();
	const goToExchange = () => {
		onDismiss();
		navigation.navigate('Exchange');
	};

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} onBack={onDismiss} />
			<View style={{ paddingHorizontal: 24 }}>
				<Text type="h3" weight="extraBold" marginBottom={8}>
					Not able to save
				</Text>
				<Text type="p" marginBottom={40}>
					First you need to have funds in USDC.
				</Text>
				<View style={{ marginBottom: 16 }}>
					<PaperTouchable onPress={() => console.log('')}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Icon name="copyStroke" style={{ marginRight: 8 }} size={16} />
							<Text type="a">Add funds</Text>
						</View>
					</PaperTouchable>
				</View>
				<PaperTouchable onPress={goToExchange}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon name="shareStroke" style={{ marginRight: 8 }} size={16} />
						<Text type="a">Exchange</Text>
					</View>
				</PaperTouchable>
			</View>
		</SafeAreaView>
	);
};

export default NotAbleToSaveModal;
