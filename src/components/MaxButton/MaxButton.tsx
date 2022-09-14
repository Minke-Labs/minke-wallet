import React from 'react';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';

interface MaxButtonProps {
	onPress: () => void;
}

const MaxButton: React.FC<MaxButtonProps> = ({ onPress }) => (
	<Touchable onPress={onPress} row>
		<Icon
			name="sparkleStroke"
			size={20}
			color="cta1"
		/>
		<Text
			type="lMedium"
			weight="semiBold"
			color="cta1"
			style={{ paddingLeft: 8 }}
		>
			Max
		</Text>
	</Touchable>
);

export default MaxButton;
