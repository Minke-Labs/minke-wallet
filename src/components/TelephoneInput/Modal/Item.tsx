import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks';
import { countries, FlagType, allCountries } from '@styles';
import { AreaObjType } from '../TelephoneInput.types';
import { areaObj } from '../TelephoneInput.utils';
import Flag from '../../Flag/Flag';
import Text from '../../Text/Text';

interface ItemProps {
	iso: AreaObjType;
	onPress: () => void;
}

export const Item: React.FC<ItemProps> = ({ iso, onPress }) => {
	const { colors } = useTheme();

	const filteredCountries = (text: string) => {
		const country = allCountries.find((item: any) => item.flag === text);
		return country;
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 72,
					borderBottomWidth: 1,
					borderBottomColor: colors.detail3
				}}
			>
				<Flag name={countries[iso] as FlagType} size={40} />
				<View style={{ marginLeft: 16 }}>
					<Text type="lLarge" weight="semiBold">
						{filteredCountries(countries[iso] as FlagType)?.name}
					</Text>
					<Text type="bSmall" color="text4">
						{areaObj[iso]}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};
