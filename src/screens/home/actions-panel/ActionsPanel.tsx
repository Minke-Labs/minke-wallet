import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import RoundButton from '@components/RoundButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { walletDelete } from '@models/wallet';

const styles = StyleSheet.create({
	scrollviewHorizontal: {
		paddingLeft: 24,
		marginBottom: 32,
		paddingBottom: 8
	},
	scrollviewHorizontalContent: {
		flexDirection: 'row',
		paddingRight: 32
	},
	roundButton: { marginRight: 16 }
});

const ActionsPanel = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const state = useState(globalWalletState());
	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.privateKey.set('');
		state.walletId.set(null);
		navigation.navigate('Welcome');
	}, [navigation]);

	return (
		<SafeAreaView>
			<ScrollView
				style={styles.scrollviewHorizontal}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.scrollviewHorizontalContent}>
					<View style={styles.roundButton}>
						<RoundButton text="Exchange" icon="compare-arrows" />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Receive" icon="arrow-circle-down" />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Copy address" icon="content-copy" />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="New wallet" icon="add" />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Switch accounts" icon="person-outline" />
					</View>
					<View style={styles.roundButton}>
						<RoundButton text="Delete wallet" icon="delete-outline" onPress={onDeleteWallet} />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ActionsPanel;
