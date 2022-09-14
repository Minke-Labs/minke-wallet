import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { spacing } from '@styles';
import Paper from '@src/components/Paper/Paper';
import Icon from '@src/components/Icon/Icon';
import { AppTourStepType } from '../AppTour.types';
import StepIndicator from './StepIndicator';
import { AppTourContext } from '../Context/AppTourContext';

const Card: React.FC<{ type: AppTourStepType }> = ({ children, type }) => {
	const { dismiss } = useContext(AppTourContext);

	return (
		<Paper p="s" m="xs">
			<StepIndicator type={type} />
			{children}
			<TouchableOpacity
				onPress={dismiss}
				style={{
					position: 'absolute',
					right: spacing.xs,
					top: spacing.xs
				}}
			>
				<Icon name="close" size={20} color="cta1" />
			</TouchableOpacity>
		</Paper>
	);
};

export default Card;
