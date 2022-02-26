import React from 'react';
import { View, ImageBackground, TouchableOpacity, useColorScheme, TouchableWithoutFeedback } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useTheme } from '@hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { globalDepositState } from '@src/stores/DepositStore';
import { makeStyles } from './EmptyState.styles';

const EmptyState = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { market } = globalDepositState().value;

	return (
		<View style={styles.container}>
			<ImageBackground
				source={scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground}
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
			<View style={styles.saveEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={0} style={styles.textCenter}>
						Open Aave
					</Text>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={24} style={styles.textCenter}>
						Savings Account
					</Text>
					<Text color="text3" marginBottom={32} style={styles.textCenter}>
						Let&apos;s make your first deposit?
					</Text>

					<TouchableWithoutFeedback style={styles.greenButton}>
						<LinearGradient
							start={{ x: 0, y: 0.75 }}
							end={{ x: 1, y: 0.25 }}
							colors={['rgba(49, 193, 139, 1)', 'rgba(49, 193, 106, 1)']}
							style={styles.linearGradient}
						>
							<Icon name="upArrowSolid" color="text1" size={16} style={styles.greenButtonIcon} />
							<Text weight="bold" style={styles.greenButtonText}>
								{(market.supplyApy * 100).toFixed(2)}% interest p.a.
							</Text>
						</LinearGradient>
					</TouchableWithoutFeedback>

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 48 }}>
						<Button iconLeft="addStroke" title="Deposit" onPress={() => navigation.navigate('Deposit')} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default EmptyState;
