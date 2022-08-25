import React from 'react';
import { View } from 'react-native';
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
	waiting
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<Touchable onPress={onSelectGas} disabled={disabled}>
			<View style={[styles.container, selected ? styles.selectedCard : {}]}>
				<View style={styles.content}>
					<Radio selected={selected!} />
					<GasOptionInner {...{ type, waiting, gasPrice, usdPrice }} />
				</View>
			</View>
		</Touchable>
	);
};

export default GasOption;
