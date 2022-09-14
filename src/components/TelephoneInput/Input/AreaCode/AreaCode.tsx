import React from 'react';
import { TouchableOpacity } from 'react-native';
import { countries, FlagType } from '@styles';
import Flag from '@src/components/Flag/Flag';
import Text from '@src/components/Text/Text';
import { areaObj } from '../../TelephoneInput.utils';
import { AreaObjType } from '../../TelephoneInput.types';

interface AreaCodeProps {
	iso: AreaObjType;
	openModal: () => void;
}

const AreaCode: React.FC<AreaCodeProps> = ({ iso, openModal }) => (
	<TouchableOpacity
		onPress={openModal}
		style={{ flexDirection: 'row' }}
	>
		<Flag
			name={countries[iso] as FlagType}
			size={24}
		/>
		<Text type="bMedium" color="text4" style={{ marginLeft: 4 }}>
			{areaObj[iso] as AreaObjType}
		</Text>
	</TouchableOpacity>
);

export default AreaCode;
