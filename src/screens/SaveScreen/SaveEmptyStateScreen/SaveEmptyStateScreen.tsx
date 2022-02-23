import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useTheme } from '@hooks';
import { makeStyles } from './SaveEmptyStateScreen.styles';
import bgSaveEmptyScreen from './bgSaveEmptyScreen.png';

const SaveEmptyStateScreen = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.container}>
			<ImageBackground source={bgSaveEmptyScreen} style={styles.bgSaveEmptyScreen} />
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
					<Text type="h2" weight="extraBold" color="text1" marginBottom={0} style={styles.textCenter}>
						Open Aave
					</Text>
					<Text type="h2" weight="extraBold" color="text1" marginBottom={24} style={styles.textCenter}>
						Savings Account
					</Text>
					<Text color="text3" marginBottom={56} style={styles.textCenter}>
						Let's make your first deposit?
					</Text>
					<Button iconLeft="addStroke" title="Depoist" marginBottom={16} />
				</View>
			</View>
		</View>
	);
};

export default SaveEmptyStateScreen;
