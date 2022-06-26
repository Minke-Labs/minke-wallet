import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from '@components';
import { BoxesProps } from './Boxes.types';
import { AppTourStepType } from '../AppTour.types';

const Step0 = () => (
	<>
		<View style={{ height: 25, justifyContent: 'center' }}>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
				marginBottom={8}
			>
				Welcome to Minke! 🌊
			</Text>
		</View>
		<Text width={237}>
			Your new favourite way to save on stablecoins and earn up to 5% annualized interest.
		</Text>
	</>
);

// TODO: Change to component's Paper after it comes from other branches after merging.
// Component's Paper has also change of light/dark themes embedded.
const Paper: React.FC = ({ children }) => (
	<View
		style={{
			paddingHorizontal: 16,
			paddingVertical: 24,
			backgroundColor: 'white',
			borderRadius: 8
		}}
	>
		{children}
	</View>
);

const { height, width } = Dimensions.get('screen');
export const getBox = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {
				position: {
					top: height * 0.4,
					left: width * 0.04 + 50
				},
				component: <Step0 />
			};
		case 1:
			return {
				position: {
					top: height * 0.4,
					left: width * 0.06 + 30
				},
				component: <Step0 />
			};
		case 2:
			return {};
		case 3:
			return {};
		case 4:
			return {};
		case 5:
			return {};
		default:
			return {};
	}
};

export const Boxes: React.FC<BoxesProps> = ({ type }) => (
	<View style={{ position: 'absolute', ...(getBox(type).position) }}>
		<Paper>
			{getBox(type).component}
		</Paper>
	</View>
);
