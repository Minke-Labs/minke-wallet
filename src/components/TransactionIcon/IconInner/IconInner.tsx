import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import Icon from '../../Icon/Icon';
import { styles } from './IconInner.styles';
import { IconInnerProps } from './IconInner.types';

const Base: React.FC = ({ children }) => {
	const { colors } = useTheme();
	return <View style={[styles.base, { backgroundColor: colors.background2 }]}>{children}</View>;
};

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
