import React from 'react';
import { View, ImageBackground, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useTheme, useNavigation, useDepositProtocols } from '@hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { bgSaveBackground, bgSaveBackgroundDark } from '@images';
import { globalDepositState } from '@src/stores/DepositStore';
import { makeStyles } from './EmptyState.styles';

const EmptyState = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();
	const navigation = useNavigation();
	const { selectedProtocol } = useDepositProtocols();
	const { market, mStableApy } = globalDepositState().value;

	const apy =
		selectedProtocol && selectedProtocol.id === 'aave' && market
			? (market.supplyApy * 100).toFixed(2)
			: mStableApy && mStableApy.toFixed(2);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<ImageBackground
					source={scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground}
					style={styles.bgSaveEmptyScreen}
				/>
			</SafeAreaView>

			<View style={styles.headerNavigation}>
				<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
					<Text weight="extraBold" type="h3" color="text1" style={{ marginLeft: 12 }}>
						Save
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.saveEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={16} center>
						Open {selectedProtocol?.name}
						{'\n'}Savings Account
					</Text>

					<Text type="p2" color="text3" marginBottom={32}>
						Let&apos;s make your first deposit?
					</Text>

					{apy && (
						<View style={styles.linearGradientContainer}>
							<LinearGradient
								start={{ x: 0, y: 0.75 }}
								end={{ x: 1, y: 0.25 }}
								colors={['#30C061', '#30C08C']}
								style={styles.linearGradient}
							>
								<Icon name="iconUp" color="text11" size={16} style={styles.greenButtonIcon} />
								<Text weight="bold" type="a" color="text11" style={{ lineHeight: 25 }}>
									{apy}% interest p.a.
								</Text>
							</LinearGradient>
						</View>
					)}

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 58 }}>
						<Button
							iconLeft="addStroke"
							title="Deposit"
							onPress={() => navigation.navigate('DepositScreen')}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default EmptyState;
