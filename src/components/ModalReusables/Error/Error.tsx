import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import { whale3Img } from '@images';
import { useLanguage } from '@hooks';
import { ErrorModalProps } from './Error.types';
import styles from './Error.styles';

const ErrorModal: React.FC<ErrorModalProps> = ({
	onDismiss,
	showHeader = true, // useful if we want to have a dismiss function but without the header
	title,
	description,
	buttonLabel
}) => {
	const { i18n } = useLanguage();
	return (
		<SafeAreaView>
			{showHeader && onDismiss && <ModalHeader onDismiss={onDismiss} />}
			<View style={styles.container}>
				<Image source={whale3Img} style={styles.image} />
				<Text weight="extraBold" center>
					{title || i18n.t('Components.ModalReusables.Error.title')}
				</Text>
				<Text weight="extraBold" center marginBottom={45}>
					{description || i18n.t('Components.ModalReusables.Error.description')}
				</Text>
				<Button
					title={buttonLabel || i18n.t('Components.ModalReusables.Error.buttonLabel')}
					onPress={onDismiss}
					marginBottom={8}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ErrorModal;
