import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { State, useState } from '@hookstate/core';
import { useTheme } from 'react-native-paper';
import { ExchangeState, Gas, globalExchangeState } from '@stores/ExchangeStore';
import { EstimateGasResponse } from '../../model/wallet';
import GasOption from './GasOption';
import { makeStyles } from './styles';

const GasSelector = ({ gweiPrice, gasPrice }: { gweiPrice: number; gasPrice: EstimateGasResponse }) => {
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	exchange.gas.set({ type: 'normal', gweiValue: gasPrice.average, gweiPrice, wait: gasPrice.avgWait } as Gas);

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
					<GasOption
						type="normal"
						gweiValue={gasPrice.average}
						gweiPrice={gweiPrice}
						wait={gasPrice.avgWait}
					/>

					<GasOption
						type="low"
						gweiValue={gasPrice.safeLow}
						gweiPrice={gweiPrice}
						wait={gasPrice.safeLowWait}
					/>
					{false ? (
						<>
							<GasOption
								type="fast"
								gweiValue={gasPrice.fast}
								gweiPrice={gweiPrice}
								wait={gasPrice.fastWait}
							/>

							<GasOption
								type="fastest"
								gweiValue={gasPrice.fastest}
								gweiPrice={gweiPrice}
								wait={gasPrice.fastestWait}
							/>
						</>
					) : null}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GasSelector;
