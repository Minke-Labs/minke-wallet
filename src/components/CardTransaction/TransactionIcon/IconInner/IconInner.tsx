import React from 'react';
import { View } from 'react-native';
import Icon from '../../../Icon/Icon';
import { IconInnerProps } from './IconInner.types';

const Base: React.FC = ({ children }) => (
	<View
		style={{
			position: 'absolute',
			bottom: 0,
			right: 0,
			backgroundColor: 'white',
			width: 14,
			height: 14,
			borderRadius: 7,
			alignItems: 'center',
			justifyContent: 'center'
		}}
	>
		{children}
	</View>
);

// TODO: Add the righ icons when the design is ready.
const IconInner: React.FC<IconInnerProps> = ({ pending, failed }) => {
	if (pending && !failed) {
		return (
			<Base>
				<View
					style={{
						position: 'absolute',
						backgroundColor: 'black',
						width: 6,
						height: 6
					}}
				/>
				<Icon size={12} name="pending" color="detail2" />
			</Base>
		);
	}

	if (failed) {
		return (
			<Base>
				<Icon size={12} name="error" color="alert1" />
			</Base>
		);
	}

	return null;
};

export default IconInner;
