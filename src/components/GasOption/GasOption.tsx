import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import Radio from './Radio/Radio';
import { makeStyles } from './GasOption.styles';
import { GasOptionProps } from './GasOption.types';
import GasOptionInner from '../GasOptionInner/GasOptionInner';

const GasOption: React.FC<GasOptionProps> = ({
	type,
	disabled = false,
	onSelectGas,
	selected,
	gasPrice,
	usdPrice,
	waiting
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<TouchableOpacity onPress={onSelectGas} disabled={disabled} activeOpacity={0.6}>
			<View style={[styles.container, selected ? styles.selectedCard : {}]}>
				<View style={styles.content}>
					<Radio selected={selected!} />
					<GasOptionInner {...{ type, waiting, gasPrice, usdPrice }} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default GasOption;
