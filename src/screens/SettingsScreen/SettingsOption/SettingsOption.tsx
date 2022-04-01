import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from '@components';
import { useTheme } from '@hooks';
import { styles } from './SettingsOption.styles';
import { SettingsOptionProps } from './SettingsOption.types';

const SettingsOption: React.FC<SettingsOptionProps> = ({ label, onPress, icon }) => {
	const { colors } = useTheme();

	return (
		<TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress}>
			<View style={styles.leftContainer}>
				<View style={[styles.imageBg, { backgroundColor: colors.background2 }]}>
					<Icon name={icon} size={24} color="text7" />
				</View>
				<Text weight="bold" style={{ fontSize: 16, marginLeft: 16 }}>
					{label}
				</Text>
			</View>

			<Icon name="arrowBackStroke" style={{ transform: [{ rotate: '180deg' }] }} size={24} color="text7" />
		</TouchableOpacity>
	);
};

export default SettingsOption;
