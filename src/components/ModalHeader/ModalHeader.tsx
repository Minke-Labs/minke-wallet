import React from 'react';
import { deviceWidth } from '@styles';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import Touchable from '@src/components/Touchable/Touchable';
import View from '@src/components/View/View';

interface ModalHeaderProps {
	onBack?: () => void;
	onDismiss: () => void;
	title?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onBack, onDismiss, title = '' }) => (
	<View
		h={64}
		row
		main="space-between"
		cross="center"
		ph="xs"
	>
		<View row cross="center">
			{!!onBack && (
				<Touchable onPress={onBack}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</Touchable>
			)}
			{!!title && (
				<Text type="hSmall" weight="bold" style={{ marginLeft: 8, maxWidth: deviceWidth * 0.8 }}>
					{title}
				</Text>
			)}
		</View>

		<Touchable onPress={onDismiss}>
			<Icon name="close" size={24} color="text7" />
		</Touchable>
	</View>
);

export default ModalHeader;
