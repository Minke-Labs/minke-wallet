import React, { useEffect } from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { MaterialIcons } from '@expo/vector-icons';
import { Appbar, useTheme, Text } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import { getENSAddress, smallWalletAddress } from '@models/wallet';
import { makeStyles } from './styles';

const Header = ({ onSettingsPress }: { onSettingsPress: (event: GestureResponderEvent) => void }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const [ensName, setEnsName] = React.useState<string | null>('');
	const state = useState(globalWalletState());
	const { address } = state.value;

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};

		fetchENSAddress();
	}, []);

	const accountName = () => {
		if (ensName) {
			return ensName;
		}
		return smallWalletAddress(address);
	};

	if (state.promised) return <AppLoading />;

	return (
		<Appbar.Header style={styles.appBar}>
			<View style={styles.appBarContent}>
				<View>
					<Text style={styles.welcomeText}>Welcome ({state.value.network.name})</Text>
					<Text style={styles.appBarUserName}>{accountName()}</Text>
				</View>
				<Appbar.Content title="" />
				<View style={styles.appBarIcons}>
					<TouchableOpacity style={styles.appBarIcon}>
						<Svg width={24} height={24} strokeWidth={1} fill={colors.primary} viewBox="0 0 96 96">
							<Path
								fill-rule="evenodd"
								clip-rule="evenodd"
								// eslint-disable-next-line max-len
								d="M9.24903 47.0962C10.8528 45.5769 13.3845 45.6453 14.9038 47.249L27.4048 60.4445C28.9235 62.0476 31.4541 62.1167 33.058 60.5988L39.7517 54.2642C44.3788 49.8853 51.6212 49.8853 56.2483 54.2642L62.942 60.5988C64.5459 62.1167 67.0765 62.0476 68.5952 60.4445L81.0962 47.249C82.6155 45.6453 85.1473 45.5769 86.751 47.0962C88.3547 48.6155 88.4231 51.1473 86.9038 52.751L74.4029 65.9465C69.8466 70.7558 62.2549 70.963 57.4431 66.4093L50.7494 60.0747C49.2071 58.6151 46.7929 58.6151 45.2506 60.0747L38.5569 66.4093C33.7451 70.963 26.1534 70.7558 21.5972 65.9464L9.0962 52.751C7.57687 51.1473 7.6453 48.6155 9.24903 47.0962Z"
								fill={colors.primary}
							/>
							<Path
								fillRule="evenodd"
								clipRule="evenodd"
								// eslint-disable-next-line max-len
								d="M35.0592 26.6624C39.1577 24.906 43.5554 24 48 24C52.4446 24 56.8423 24.906 60.9408 26.6624C65.0389 28.4188 68.7535 30.9892 71.8762 34.2202C73.4115 35.8086 73.3683 38.3409 71.7798 39.8762C70.1914 41.4114 67.6591 41.3683 66.1238 39.7798C63.731 37.3041 60.8977 35.3477 57.7894 34.0156C54.6815 32.6836 51.3555 32 48 32C44.6445 32 41.3185 32.6836 38.2106 34.0156C35.1023 35.3477 32.269 37.3041 29.8762 39.7798C28.3409 41.3683 25.8086 41.4115 24.2202 39.8762C22.6317 38.3409 22.5885 35.8086 24.1238 34.2202C27.2465 30.9892 30.9611 28.4188 35.0592 26.6624Z"
								fill={colors.primary}
							/>
						</Svg>
					</TouchableOpacity>
					<TouchableOpacity style={styles.appBarIcon}>
						<Svg width={24} height={24} strokeWidth={1} viewBox="0 0 96 96">
							<Path
								fillRule="evenodd"
								clipRule="evenodd"
								// eslint-disable-next-line max-len
								d="M17.7461 37.7863C22.0956 25.0917 34.0717 16 48.1317 16C53.0039 16 57.6208 17.0892 61.7575 19.041C55.3917 22.2496 51.0331 28.8676 51.0331 36.4898C51.0331 47.2446 59.7105 56 70.4599 56C77.8298 56 84.2254 51.8786 87.5135 45.8404C88.57 43.9003 87.8536 41.471 85.9135 40.4145C83.9734 39.358 81.5441 40.0744 80.4876 42.0145C78.5366 45.5973 74.7689 48 70.4599 48C64.1694 48 59.0331 42.8671 59.0331 36.4898C59.0331 30.1125 64.1694 24.9796 70.4599 24.9796C70.8475 24.9796 71.2294 24.9989 71.6049 25.0364C73.3314 25.2086 74.9722 24.2481 75.6672 22.6583C76.3621 21.0684 75.9529 19.2118 74.6538 18.0615C67.5867 11.8035 58.2977 8 48.1317 8C30.5263 8 15.5941 19.3857 10.178 35.1933C9.46193 37.2832 10.5756 39.5578 12.6655 40.2738C14.7554 40.9899 17.03 39.8762 17.7461 37.7863ZM9.70586 53.6876C16.1469 47.9622 25.8532 47.9622 32.2942 53.6876L33.0208 54.3334C36.4307 57.3645 41.5693 57.3645 44.9793 54.3334L45.3426 54.0105C46.9937 52.5428 49.522 52.6916 50.9897 54.3427C52.4574 55.9938 52.3086 58.5221 50.6575 59.9898L50.2942 60.3127C43.8532 66.0381 34.1469 66.0381 27.7059 60.3127L26.9793 59.6669C23.5693 56.6358 18.4307 56.6358 15.0208 59.6669L14.6575 59.9898C13.0064 61.4575 10.4781 61.3087 9.01041 59.6576C7.54273 58.0065 7.69146 55.4782 9.34259 54.0105L9.70586 53.6876ZM9.70586 76.6876C16.1469 70.9622 25.8532 70.9622 32.2942 76.6876L33.0208 77.3334C36.4307 80.3645 41.5693 80.3645 44.9793 77.3334L45.7059 76.6876C52.1469 70.9622 61.8532 70.9622 68.2942 76.6876L69.0208 77.3334C72.4307 80.3645 77.5693 80.3645 80.9793 77.3334L81.3426 77.0105C82.9937 75.5428 85.522 75.6916 86.9897 77.3427C88.4574 78.9938 88.3086 81.5221 86.6575 82.9898L86.2942 83.3127C79.8532 89.0381 70.1469 89.0381 63.7059 83.3127L62.9793 82.6669C59.5693 79.6358 54.4307 79.6358 51.0208 82.6669L50.2942 83.3127C43.8532 89.0381 34.1469 89.0381 27.7059 83.3127L26.9793 82.6669C23.5693 79.6358 18.4307 79.6358 15.0208 82.6669L14.6575 82.9898C13.0064 84.4575 10.4781 84.3087 9.01041 82.6576C7.54273 81.0065 7.69146 78.4782 9.34259 77.0105L9.70586 76.6876Z"
								fill={colors.primary}
							/>
						</Svg>
					</TouchableOpacity>
					<TouchableOpacity>
						<MaterialIcons
							name="settings"
							size={20}
							color={colors.primary}
							style={styles.appBarIcon}
							onPress={onSettingsPress}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Appbar.Header>
	);
};

export default Header;