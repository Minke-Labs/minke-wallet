import React from 'react';
import { View as RNView } from 'react-native';
import { useTheme } from '@hooks';
import Radio from './Radio/Radio';
import { makeStyles } from './GasOption.styles';
import { GasOptionProps } from './GasOption.types';
import Touchable from '../Touchable/Touchable';
import GasOptionInner from '../GasOptionInner/GasOptionInner';

const GasOption: React.FC<GasOptionProps> = ({
	type,
	disabled = false,
	onSelectGas,
	selected,
	gasPrice,
	usdPrice,
	waiting,
	gasLimit,
	network
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<Touchable onPress={onSelectGas} disabled={disabled}>
			<RNView style={[styles.container, selected ? styles.selectedCard : {}]}>
				<RNView style={styles.content}>
					<Radio selected={selected!} />
					<GasOptionInner {...{ type, waiting, gasPrice, usdPrice, gasLimit, network }} />
				</RNView>
			</RNView>
		</Touchable>
	);
};

export default GasOption;
