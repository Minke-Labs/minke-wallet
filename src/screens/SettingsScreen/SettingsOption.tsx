import React from 'react';
import { GestureResponderEvent, TouchableOpacity, StyleSheet, View } from 'react-native';
import { IconType } from '@styles';
import { Text, Icon } from '@components';
import { useTheme } from '@hooks';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 32
	},

	leftContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	settingsIcon: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		borderStyle: 'solid'
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	imageBg: {
		borderRadius: 12,
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

interface SettingsOptionProps {
	label: string;
	icon: IconType;
	onPress: (event: GestureResponderEvent) => void;
}

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
