import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, useTheme } from 'react-native-paper';
import waveLower from './wave-lower.png';
import waveBigger from './wave-bigger.png';
import styles from './styles';

const Header = () => {
	const { colors } = useTheme();
	return (
		<Appbar.Header style={styles.appBar}>
			<View style={styles.appBarContent}>
				<View>
					<Text>Welcome</Text>
					<Text style={styles.appBarUserName}>jreyes.eth</Text>
				</View>
				<Appbar.Content title="" />
				<View style={styles.appBarIcons}>
					<TouchableOpacity style={styles.appBarIcon}>
						<Image source={waveLower} style={styles.appBarIcon} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.appBarIcon}>
						<Image source={waveBigger} />
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialIcons name="settings" size={20} color={colors.primary} style={styles.appBarIcon} />
					</TouchableOpacity>
				</View>
			</View>
		</Appbar.Header>
	);
};

export default Header;
