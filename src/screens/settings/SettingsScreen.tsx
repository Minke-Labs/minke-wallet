import React, { useCallback } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { Headline, Text, useTheme } from 'react-native-paper';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Container from '@components/Container';
import { ChangeNetwork } from './change-network/ChangeNetwork';
import { makeStyles } from './styles';

const SettingsScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors, useColorScheme());

	const SettingsOption = useCallback(
		({ label, onPress, icon }) => (
			<TouchableOpacity style={styles.settingsItem} onPress={onPress}>
				<View style={styles.settingsIcon}>{icon}</View>
				<View style={styles.settingsItemText}>
					<Text style={styles.label}>{label}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.rightIcon}>
						<MaterialIcons name="arrow-forward-ios" size={24} color={colors.primary} />
					</Text>
				</View>
			</TouchableOpacity>
		),
		[]
	);
	return (
		<Container>
			<Headline style={styles.headline}>Settings</Headline>
			<View style={styles.settingsOptions}>
				<SettingsOption
					label="Backup"
					icon={<AntDesign name="clouduploado" size={32} color={colors.primary} />}
				/>
				<SettingsOption
					label="Currency"
					icon={
						<MaterialCommunityIcons name="currency-usd-circle-outline" size={32} color={colors.primary} />
					}
				/>
				<SettingsOption label="Network" icon={<Entypo name="network" size={32} color={colors.primary} />} />
				<SettingsOption
					label="Contact Support"
					icon={<MaterialIcons name="support" size={32} color={colors.primary} />}
				/>
				<ChangeNetwork />
			</View>
		</Container>
	);
};

export default SettingsScreen;
