import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, Icon } from '@components';
import { BoxesProps } from './Boxes.types';
import { AppTourStepType } from '../AppTour.types';

const Step0 = () => (
	<>
		<View style={{ height: 25, flexDirection: 'row', marginBottom: 8 }}>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Welcome to Minke!
			</Text>
			<Text>🌊</Text>
		</View>
		<Text width={237} type="a">
			Your new favourite way to save on stablecoins and earn up to 5% annualized interest.
		</Text>
	</>
);

const Step1 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="addStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Add funds
			</Text>
		</View>
		<Text width={237} type="a">
			You can buy USDC in 3 clicks with
			Apple Pay or your local payment solution.
		</Text>
	</>
);

const Step2 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="saveStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Save
			</Text>
		</View>
		<Text width={237} type="a">
			Get up to 5% anual interest on stable coins with
			<Text type="a" weight="bold"> mStable</Text> or <Text type="a" weight="bold">Aave.</Text>
		</Text>
	</>
);

const Step3 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="sendStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Send
			</Text>
		</View>
		<Text width={237} type="a">
			Send tokens to a another wallet or to an exchange like Binance or Coinbase.
		</Text>
	</>
);

const Step4 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="sendStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Send
			</Text>
		</View>
		<Text width={237} type="a" marginBottom={16}>
			Send tokens to a another wallet or to an exchange like Binance or Coinbase.
		</Text>

		<View style={{ height: 25, flexDirection: 'row' }}>
			<Icon
				name="exchangeStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Exchange
			</Text>
		</View>
		<Text width={237} type="a">
			Swap between tokens.
		</Text>
	</>
);

const Step5 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="sendStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Send
			</Text>
		</View>
		<Text width={237} type="a" marginBottom={16}>
			Send tokens to a another wallet or to an exchange like Binance or Coinbase.
		</Text>

		<View style={{ height: 25, flexDirection: 'row' }}>
			<Icon
				name="exchangeStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Exchange
			</Text>
		</View>
		<Text width={237} type="a" marginBottom={16}>
			Swap between tokens.
		</Text>

		<View style={{ height: 25, flexDirection: 'row' }}>
			<Icon
				name="receiveStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Receive
			</Text>
		</View>
		<Text width={237} type="a">
			Copy your public address or use a QR code.
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
					top: height * 0.18 + 180,
					left: width * 0.06 + 30
				},
				component: <Step1 />
			};
		case 2:
			return {
				position: {
					top: height * 0.18 + 180,
					left: width * 0.2
				},
				component: <Step2 />
			};
		case 3:
			return {
				position: {
					top: height * 0.26 + 170,
					left: width * 0.06 + 30
				},
				component: <Step3 />
			};
		case 4:
			return {
				position: {
					top: height * 0.26 + 170,
					left: width * 0.06 + 30
				},
				component: <Step4 />
			};
		case 5:
			return {
				position: {
					top: height * 0.26 + 170,
					left: width * 0.06 + 30
				},
				component: <Step5 />
			};
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
