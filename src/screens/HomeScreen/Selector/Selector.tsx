import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper2, View, Icon } from '@components';
import { spacing } from '@styles';

interface SelectorProps {
	onActionPressed: () => void;
}

export const Selector: React.FC<SelectorProps> = ({ onActionPressed }) => (
	<View
		cross="center"
		s={1}
		style={{
			position: 'absolute',
			width: '100%',
			bottom: spacing[6]
		}}
	>
		<Paper2
			w={196}
			h={52}
			br={6}
			row
			main="space-between"
			cross="center"
			ph={4}
		>
			<TouchableOpacity onPress={() => null}>
				<Icon name="home" size={28} color="cta1" />
			</TouchableOpacity>
			<TouchableOpacity onPress={onActionPressed}>
				<Icon name="exchange" size={28} color="cta2" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => null}>
				<Icon name="hub" size={28} color="cta2" />
			</TouchableOpacity>
		</Paper2>
	</View>
);
