import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@components';
import { Paper } from './Paper';
import { AppTourStepType } from '../AppTour.types';
import StepIndicator from './StepIndicator';
import { AppTourContext } from '../Context/AppTourContext';

const styles = StyleSheet.create({
	close: {
		position: 'absolute',
		right: 16,
		top: 16
	}
});

const Card: React.FC<{ type: AppTourStepType }> = ({ children, type }) => {
	const { dismiss } = useContext(AppTourContext);

	return (
		<Paper>
			<StepIndicator type={type} />
			{children}
			<TouchableOpacity onPress={dismiss} style={styles.close}>
				<Icon name="closeStroke" size={20} color="cta1" />
			</TouchableOpacity>
		</Paper>
	);
};

export default Card;
