import React from 'react';
import { View, ScrollView } from 'react-native';
import GasOption from './GasOption/GasOption';

const GasSelector = () => (
	<View style={{ alignItems: 'center' }}>
		<ScrollView
			style={{ marginBottom: 12 }}
			horizontal
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
		>
			<View style={{
				flexDirection: 'row',
				paddingLeft: 24,
				paddingRight: 32
			}}
			>
				<GasOption type="fast" />
				<GasOption type="normal" />
			</View>
		</ScrollView>

		<View style={{
			height: 6,
			width: 40,
			borderWidth: 1,
			borderColor: 'purple'
		}}
		/>
	</View>
);

export default GasSelector;
