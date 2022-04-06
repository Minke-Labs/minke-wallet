import React from 'react';
import { View } from 'react-native';
import Icon from '../../../Icon/Icon';
import { styles } from './IconInner.styles';
import { IconInnerProps } from './IconInner.types';

const Base: React.FC = ({ children }) => <View style={styles.base}>{children}</View>;

// TODO: Add the righ icons when the design is ready.
const IconInner: React.FC<IconInnerProps> = ({ pending, failed }) => {
	if (pending && !failed) {
		return (
			<Base>
				<View style={styles.pending} />
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
