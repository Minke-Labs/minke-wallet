import React from 'react';
import { TouchableOpacity } from 'react-native';
import { countries, FlagType } from '@styles';
import Flag from '../../../Flag/Flag';
import Text from '../../../Text/Text';

type AreaObjType = keyof typeof areaObj;
const areaObj = {
	US: '(+1)',
	BR: '(+55)',
	AU: '(+61)'
};

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
