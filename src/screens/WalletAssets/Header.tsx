import React from 'react';
import { Icon, Text } from '@components';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Header = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View>
			<View
				style={{
					marginBottom: 54,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					paddingHorizontal: 24
				}}
			>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" size={24} color="text7" style={{ marginRight: 12 }} />
					</TouchableOpacity>
					<Text type="h3" weight="extraBold">
						Wallet
					</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
					<Icon size={24} color="text7" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Header;
