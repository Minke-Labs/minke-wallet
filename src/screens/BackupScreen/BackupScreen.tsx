/* eslint-disable no-console */
import React from 'react';
import { WelcomeLayout } from '@layouts';
import { Icon, Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Card from './Card';
import CopyButton from './CopyButton';
import styles from './BackupScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';

const seed = 'wasp turtle courage ship meteor pasta ticket chess record door television mist';

const BackupScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const onFinish = () => navigation.navigate('Wallet');

	const onCopyToClipboard = () => {
		console.log('Copy to clipboard');
	};

	return (
		<WelcomeLayout>
			<View style={styles.headerContainer}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={onFinish}>
					<Text weight="medium" type="a" color="text7">
						Done
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<Text weight="extraBold" type="h3" marginBottom={8}>
					Recovery phrase
				</Text>

				<Text color="text2" width={290} marginBottom={40}>
					Write this down on paper or save it in your password manager.
				</Text>

				<FlatList
					keyExtractor={(item, idx) => `${item}-${idx}`}
					data={seed.split(' ')}
					renderItem={({ item, index }) => <Card title={item} idx={index} />}
					numColumns={2}
					style={{ flexGrow: 0, marginBottom: 24 }}
				/>

				<CopyButton onPress={onCopyToClipboard} />
			</View>
		</WelcomeLayout>
	);
};

export default BackupScreen;
