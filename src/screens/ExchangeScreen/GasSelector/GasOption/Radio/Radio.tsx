import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';

interface RadioProps {
	selected: boolean;
}

const Radio: React.FC<RadioProps> = ({ selected }) => {
	const { colors } = useTheme();
	return (
		<View style={{
			width: 14,
			height: 14,
			borderRadius: 7,
			borderWidth: 1,
			borderColor: selected ? colors.cta1 : colors.detail1,
			justifyContent: 'center',
			alignItems: 'center'
		}}
		>
			<View style={{
				width: 8,
				height: 8,
				borderRadius: 4,
				...(selected && { backgroundColor: colors.cta1 })
			}}
			/>
		</View>
	);
};

export default Radio;
