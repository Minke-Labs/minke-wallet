import React from 'react';
import { SafeAreaView, Image, View } from 'react-native';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';
import i18n from '@localization';
import { whale3Img } from '@images';
import { ErrorModalProps } from './Error.types';
import styles from './Error.styles';

const ErrorModal: React.FC<ErrorModalProps> = ({
	onDismiss,
	showHeader = true, // useful if we want to have a dismiss function but without the header
	title = 'Oops!',
	description = i18n.t('ModalReusables.Error.description'),
	buttonLabel = i18n.t('ModalReusables.Error.buttonLabel')
}) => (
	<SafeAreaView>
		{showHeader && onDismiss && <ModalHeader onDismiss={onDismiss} />}
		<View style={styles.container}>
			<Image source={whale3Img} style={styles.image} />
			<Text weight="extraBold" center>
				{title}
			</Text>
			<Text weight="extraBold" center marginBottom={45}>
				{description}
			</Text>
			<Button title={buttonLabel} onPress={onDismiss} marginBottom={8} />
		</View>
	</SafeAreaView>
);

export default ErrorModal;
