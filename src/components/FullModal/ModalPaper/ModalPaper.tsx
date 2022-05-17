import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import styles from './ModalPaper.styles';

interface ModalPaperProps {
	onPress: () => void;
}

const ModalPaper: React.FC<ModalPaperProps> = ({ children, onPress }) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={{
				width: '100%',
				paddingHorizontal: 16,
				flexDirection: 'row',
				justifyContent: 'flex-end'
			}}
			activeOpacity={0.6}
			{...{ onPress }}
		>
			<Icon name="closeStroke" style={{ marginRight: 8 }} color="text4" size={24} />
			<Text color="text4">Close</Text>
		</TouchableOpacity>
		<View style={styles.content}>
			{children}
		</View>
	</View>
);

export default ModalPaper;
