import React from 'react';
import { View, Dimensions } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const { height, width } = Dimensions.get('screen');

const getHole = (type: number) => {
	switch (type) {
		case 0:
			return {};
		case 1:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: height * 0.16 + 60,
				left: width * 0.06 + 30
			};
		case 2:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: height * 0.16 + 60,
				left: width * 0.5 + 30
			};
		case 3:
			return {
				width: 104,
				height: 64,
				borderRadius: 24,
				top: height * 0.162 + 150,
				left: width * 0.05
			};
		default:
			return {};
	}
};

const Mask: React.FC = ({ children }) => (
	<View
		style={{
			position: 'absolute',
			top: 0,
			width: '100%',
			height: '100%',
			backgroundColor: '#000000'
		}}
		pointerEvents="none"
	>
		<MaskedView
			style={{ flex: 1 }}
			maskElement={
				<View
					style={{
						backgroundColor: '#00000060',
						flex: 1
					}}
				>
					<View
						style={{
							backgroundColor: 'white',
							position: 'absolute',
							...(getHole(3))
						}}
					/>
				</View>
			}
		>
			{children}
		</MaskedView>
	</View>
);

export default Mask;
