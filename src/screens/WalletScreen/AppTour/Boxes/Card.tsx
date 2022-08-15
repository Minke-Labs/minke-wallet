import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Paper } from '@components';
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
		<Paper padding={24} margin={16}>
			<StepIndicator type={type} />
			{children}
			<TouchableOpacity onPress={dismiss} style={styles.close}>
				<Icon name="close" size={20} color="cta1" />
			</TouchableOpacity>
		</Paper>
	);
};

export default Card;
