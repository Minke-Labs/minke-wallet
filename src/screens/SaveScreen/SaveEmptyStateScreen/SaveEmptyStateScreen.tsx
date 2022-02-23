import React from 'react';
import { View, ImageBackground, TouchableOpacity, useColorScheme } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useTheme } from '@hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { makeStyles } from './SaveEmptyStateScreen.styles';
import bgSaveEmptyScreen from './bgSaveEmptyScreen.png';
import bgSaveEmptyScreenDark from './bgSaveEmptyScreenDark.png';

const SaveEmptyStateScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();

	return (
		<View style={styles.container}>
			<ImageBackground
				source={scheme === 'dark' ? bgSaveEmptyScreenDark : bgSaveEmptyScreen}
				style={styles.bgSaveEmptyScreen}
			/>
			<View style={styles.headerNavegation}>
				<TouchableOpacity style={styles.headerNavegationLeft} onPress={() => navigation.goBack()}>
					<Icon name="chevronLeft" color="cta1" size={24} />
					<Text weight="extraBold" color="text1" marginBottom={8}>
						Save
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.saceEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={0} style={styles.textCenter}>
						Open Aave
					</Text>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={24} style={styles.textCenter}>
						Savings Account
					</Text>
					<Text color="text3" marginBottom={32} style={styles.textCenter}>
						Let's make your first deposit?
					</Text>

					<TouchableOpacity style={styles.greenButton}>
						<LinearGradient
							start={{ x: 0, y: 0.75 }}
							end={{ x: 1, y: 0.25 }}
							colors={['rgba(49, 193, 139, 1)', 'rgba(49, 193, 106, 1)']}
							style={styles.linearGradient}
						>
							<Icon name="upArrowSolid" color="text1" size={16} style={styles.greenButtonIcon} />
							<Text weight="bold" style={styles.greenButtonText}>
								10% interest p.a.
							</Text>
						</LinearGradient>
					</TouchableOpacity>

					<Button iconLeft="addStroke" title="Depoist" marginBottom={16} />
				</View>
			</View>
		</View>
	);
};

export default SaveEmptyStateScreen;
