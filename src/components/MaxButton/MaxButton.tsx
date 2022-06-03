import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';

interface MaxButtonProps {
	onPress: () => void;
}

const MaxButton: React.FC<MaxButtonProps> = ({ onPress }) => (
	<TouchableOpacity
		onPress={onPress}
		style={{ flexDirection: 'row', alignItems: 'center' }}
	>
		<Icon name="sparkleStroke" size={16} color="cta1" />
		<Text type="a" weight="semiBold" color="cta1" style={{ paddingLeft: 4 }}>
			Max
		</Text>
	</TouchableOpacity>
);

export default MaxButton;
