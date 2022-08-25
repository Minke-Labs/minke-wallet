import React from 'react';
import { View } from 'react-native';
import { deviceWidth } from '@styles';
import Text from '../Text/Text';
import styles from './ModalHeader.styles';
import Icon from '../Icon/Icon';
import Touchable from '../Touchable/Touchable';

interface ModalHeaderProps {
	onBack?: () => void;
	onDismiss: () => void;
	title?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onBack, onDismiss, title = '' }) => (
	<View style={styles.container}>
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{!!onBack && (
				<Touchable onPress={onBack}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</Touchable>
			)}
			{!!title && (
				<Text type="hSmall" weight="bold" style={{ marginLeft: 8, maxWidth: deviceWidth * 0.8 }}>
					{title}
				</Text>
			)}
		</View>

		<Touchable onPress={onDismiss}>
			<Icon name="close" size={24} color="text7" />
		</Touchable>
	</View>
);

export default ModalHeader;
