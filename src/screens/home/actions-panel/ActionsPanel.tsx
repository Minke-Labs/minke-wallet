import React from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native';
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

const ActionsPanel = () => (
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
			</View>
		</ScrollView>
	</SafeAreaView>
);

export default ActionsPanel;
