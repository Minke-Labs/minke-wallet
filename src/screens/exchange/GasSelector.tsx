import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import GasOption from './GasOption';
import { makeStyles } from './styles';

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
