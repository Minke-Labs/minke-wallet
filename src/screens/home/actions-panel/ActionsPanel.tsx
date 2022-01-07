import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from '@hookstate/core';
import { RootStackParamList } from '../../../helpers/param-list-type';
import { walletDelete } from '../../../model/wallet';
import { globalWalletState } from '../../../stores/WalletStore';
import RoundButton from '../../../components/RoundButton';

const styles = StyleSheet.create({
	scrollviewHorizontal: {
		paddingLeft: 24,
		marginBottom: 32,
		paddingBottom: 8
	},
	scrollviewHorizontalContent: {
		flexDirection: 'row',
		paddingRight: 32
	}
});

const ActionsPanel = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
	const state = useState(globalWalletState());
	const onDeleteWallet = useCallback(async () => {
		await walletDelete(state.value?.walletId || '');
		state.set({ wallet: null, walletId: null });
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
					<RoundButton text="Exchange" icon="compare-arrows" />
					<RoundButton text="Receive" icon="arrow-circle-down" />
					<RoundButton text="Copy address" icon="content-copy" />
					<RoundButton text="New wallet" icon="add" />
					<RoundButton text="Switch accounts" icon="person-outline" />
					<RoundButton text="Delete wallet" icon="delete-outline" onPress={onDeleteWallet} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ActionsPanel;
