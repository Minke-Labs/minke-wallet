import React from 'react';
import Touchable from '@src/components/Touchable/Touchable';
import GasOptionInner from '@src/components/GasOptionInner/GasOptionInner';
import View from '@src/components/View/View';
import Radio from './Radio/Radio';
import { GasOptionProps } from './GasOption.types';

const GasOption: React.FC<GasOptionProps> = ({
	type,
	disabled = false,
	onSelectGas,
	selected,
	gasPrice,
	usdPrice,
	waiting
}) => (
	<Touchable onPress={onSelectGas} disabled={disabled}>
		<View
			p="xs"
			br="xs"
			mr="xxs"
			bgc="background5"
			w={318}
			bw={selected ? 2 : 0}
			bc="cta1"
		>
			<View row cross="center">
				<Radio selected={selected!} />
				<GasOptionInner {...{ type, waiting, gasPrice, usdPrice }} />
			</View>
		</View>
	</Touchable>
);

export default GasOption;
