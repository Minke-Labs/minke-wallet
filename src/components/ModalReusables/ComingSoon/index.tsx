import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import { whale4Img } from '@images';
import { useLanguage } from '@hooks';
import { ComingSoonModalProps } from './types';
import styles from './styles';

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ onDismiss }) => {
	const { i18n } = useLanguage();
	return (
		<SafeAreaView>
			<ModalHeader onDismiss={onDismiss} />
			<View style={styles.container}>
				<Image source={whale4Img} style={styles.image} />
				<Text weight="extraBold" center>
					{i18n.t('Components.ComingSoonModal.coming_soon')}
				</Text>
				<Text weight="extraBold" center marginBottom={45}>
					{i18n.t('Components.ComingSoonModal.devs_doing_something')}
				</Text>
				<Button title="Ok, got it" onPress={onDismiss} marginBottom={8} />
			</View>
		</SafeAreaView>
	);
};

export default ComingSoonModal;
