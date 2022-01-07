import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, useTheme, Text } from 'react-native-paper';
import waveLower from './wave-lower.png';
import waveBigger from './wave-bigger.png';
import { makeStyles } from './styles';

const Header = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<Appbar.Header style={styles.appBar}>
			<View style={styles.appBarContent}>
				<View>
					<Text style={styles.welcomeText}>Welcome</Text>
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
