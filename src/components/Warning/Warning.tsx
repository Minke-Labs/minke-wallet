import React from 'react';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';

const Warning = ({ label }: { label: string }) => (
	<View
		row
		br="xs"
		mb="m"
		bw={1}
		style={{ borderColor: '#FFFCF5' }}
	>
		<View
			p="xs"
			btlr="xs"
			bblr="xs"
			style={{ borderColor: '#FFFCF5' }}
		>
			<Icon name="attention" color="alert6" size={32} />
		</View>
		<Text
			type="a"
			style={{
				paddingVertical: 10,
				paddingHorizontal: 16,
				alignSelf: 'center'
			}}
		>
			{label}
		</Text>
	</View>
);

export default Warning;
