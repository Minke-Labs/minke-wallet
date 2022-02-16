import React from 'react';
import { View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import AssetList from './AssetList/AssetList';

const WalletAssets = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<ScrollView>
			<SafeAreaView>
				<View
					style={{
						marginTop: 14,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 24
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center'
						}}
					>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Icon name="arrowBackStroke" size={24} color="text7" style={{ marginRight: 12 }} />
						</TouchableOpacity>
						<Text type="h3" weight="extraBold">
							WalletAssets
						</Text>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
						<Icon size={24} color="text7" />
					</TouchableOpacity>
				</View>
				<View
					style={{
						height: 207,
						alignItems: 'center',
						paddingTop: 64
					}}
				>
					<Text marginBottom={10}>Current value</Text>
					<Text weight="medium" style={{ fontSize: 48, lineHeight: 58 }}>
						$200.00
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						width: '100%',
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						backgroundColor: '#F2EAE1'
					}}
				>
					<AssetList />
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default WalletAssets;
