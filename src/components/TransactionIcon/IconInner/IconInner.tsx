import React from 'react';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import { IconInnerProps } from './IconInner.types';

const Base: React.FC = ({ children }) => (
	<View
		bgc="background2"
		round={14}
		main="center"
		cross="center"
		style={{ position: 'absolute', bottom: 0, right: 0 }}
	>
		{children}
	</View>
);

const IconInner: React.FC<IconInnerProps> = ({ pending, failed }) => {
	if (pending && !failed) {
		return (
			<Base>
				<View
					w={6}
					h={6}
					style={{
						position: 'absolute',
						backgroundColor: 'black'
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
