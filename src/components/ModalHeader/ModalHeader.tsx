import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import styles from '../Modal/Modal.styles';
import Icon from '../Icon/Icon';

interface ModalHeaderProps {
	onBack?: () => void;
	onDismiss: () => void;
	title?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onBack, onDismiss, title = '' }) => (
	<View style={styles.header}>
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			{onBack ? (
				<TouchableOpacity onPress={onBack} activeOpacity={0.8}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</TouchableOpacity>
			) : <View />}

			{
				title ? (
					<Text type="hSmall" weight="bold" style={{ marginLeft: 8 }}>
						{title}
					</Text>
				) : null
			}
		</View>

		<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
			<Icon name="closeStroke" size={24} color="text7" />
		</TouchableOpacity>
	</View>
);

export default ModalHeader;
