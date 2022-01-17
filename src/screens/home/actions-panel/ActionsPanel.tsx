import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, GestureResponderEvent } from 'react-native';
import RoundButton from '@components/RoundButton';

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

const ActionsPanel = ({
	onDeleteWallet,
	onExchange
}: {
	onDeleteWallet: (event: GestureResponderEvent) => void;
	onExchange: (event: GestureResponderEvent) => void;
}) => (
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

export default ActionsPanel;
