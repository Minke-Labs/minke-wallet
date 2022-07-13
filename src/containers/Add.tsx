import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { ModalHeader, Text, ListItem } from '@components';
import APay from './APay.svg';

const Add = () => (
	<SafeAreaView>
		<ModalHeader
			onBack={() => null}
			onDismiss={() => null}
		/>
		<View style={{ paddingHorizontal: 16 }}>
			<Text
				marginBottom={16}
				weight="bold"
				type="hMedium"
			>
				Add funds
			</Text>
			<ListItem
				tagType="svg"
				SvgComponent={APay}
				title="Buy crypto"
				desc="Apple Pay, card or bank transfer"
			/>
			<ListItem
				title="External exchange"
				desc="Apple Pay, card or bank transfer"
			/>
		</View>
	</SafeAreaView>
);

export default Add;
