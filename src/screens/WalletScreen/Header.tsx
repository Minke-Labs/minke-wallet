import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
import { Text, Icon } from '@components';

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 24
	},
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
});

interface HeaderProps {
	onSettingsPress: (event: GestureResponderEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsPress }) => (
	<View style={styles.headerContainer}>
		<View>
			<Text type="a" weight="bold">
				Welcome
			</Text>
			<Text weight="extraBold" type="h3">
				jreyes.eth
			</Text>
		</View>
		<View style={styles.iconsContainer}>
			<TouchableOpacity activeOpacity={0.6}>
				<Icon name="walletConnectStroke" style={{ marginRight: 21 }} size={20} color="text7" />
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.6}>
				<Icon name="waveStroke" style={{ marginRight: 21 }} size={20} color="text7" />
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.6} onPress={onSettingsPress}>
				<Icon size={20} color="text7" />
			</TouchableOpacity>
		</View>
	</View>
);

export default Header;
