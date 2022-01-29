import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal as PaperModal, Text, useTheme, IconButton } from 'react-native-paper';
import globalStyle from 'old/src/components/global.styles';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		modalContainerStyle: {
			backgroundColor: colors.background,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			padding: 24,
			width: '100%',
			position: 'absolute',
			paddingBottom: 40,
			bottom: -32
		},
		modalHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 8
		}
	});

const Modal = ({
	visible,
	onDismiss,
	onCloseAll,
	onBack,
	headline,
	children
}: {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
	onBack?: () => void;
	headline?: string;
	children?: JSX.Element;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<PaperModal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainerStyle}>
			<View style={styles.modalHeader}>
				{onBack ? <IconButton icon="chevron-left" size={24} color={colors.primary} onPress={onBack} /> : null}
				{headline ? <Text style={globalStyle.headline}>{headline}</Text> : null}
				<IconButton icon="close" size={24} color={colors.primary} onPress={onCloseAll} />
			</View>

			{children}
		</PaperModal>
	);
};

export default Modal;
