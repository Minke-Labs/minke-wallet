import { useTheme } from '@hooks';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from '../../Modal/Modal';
import Flag from '../../Flag/Flag';
import Text from '../../Text/Text';

interface TelephoneInputModalProps {
	isVisible: boolean;
	onDismiss: () => void;
}

interface ItemProps {
	iso: 'AU' | 'US' | 'BR'
}

const Item: React.FC<ItemProps> = ({ iso }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					height: 72,
					borderBottomWidth: 1,
					borderBottomColor: colors.detail3
				}}
			>
				<Flag name="unitedStates" size={40} />
				<Text
					type="lLarge"
					weight="semiBold"
					style={{ marginLeft: 16 }}
				>
					{iso}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const TelephoneInputModal: React.FC<TelephoneInputModalProps> = ({ isVisible, onDismiss }) => (
	<Modal isVisible={isVisible} onDismiss={onDismiss}>
		<View
			style={{
				padding: 16
			}}
		>
			<Item iso="US" />
			<Item iso="AU" />
			<Item iso="BR" />
		</View>
	</Modal>
);

export default TelephoneInputModal;
