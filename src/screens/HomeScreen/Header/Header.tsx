import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from '@components';

const Header = () => (
	<View row main="space-between" cross="flex-end" mb={3}>
		<View>
			<Text type="lMedium" weight="semiBold">
				Welcome
			</Text>
			<Text type="hMedium" weight="bold">
				jreyes.eth
			</Text>
		</View>
		<View row cross="center">
			<View
				w={72}
				h={19}
				br={2}
				bg="alert3"
				mr={3}
			/>
			<TouchableOpacity onPress={() => null}>
				<Icon
					name="gear"
					size={28}
					color="cta1"
				/>
			</TouchableOpacity>
		</View>
	</View>
);

export default Header;
