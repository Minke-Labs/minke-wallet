import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import { ModalHeader, Text, Button } from '@components';
import { whale4Img } from '@images';

interface ComingSoonModalProps {
	onDismiss: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ onDismiss }) => (
	<SafeAreaView>
		<ModalHeader onDismiss={onDismiss} />
		<View style={{ paddingHorizontal: 24, alignItems: 'center' }}>
			<Image
				source={whale4Img}
				style={{
					width: 147,
					height: 137,
					marginBottom: 16
				}}
			/>

			<Text weight="extraBold" center>
				Coming soon!
			</Text>
			<Text weight="extraBold" center marginBottom={45}>
				Devs are doing something.
			</Text>
			<Button title="Ok, got it" onPress={onDismiss} marginBottom={8} />
		</View>
	</SafeAreaView>
);

export default ComingSoonModal;
