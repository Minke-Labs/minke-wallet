import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import GasOption from './GasOption';
import { makeStyles } from './ExchangeScreen.styles';

const GasSelector = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<SafeAreaView>
			<ScrollView
				style={styles.scrollviewHorizontal}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.scrollviewHorizontalContent}>
					<GasOption type="normal" />
					<GasOption type="fast" />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GasSelector;
