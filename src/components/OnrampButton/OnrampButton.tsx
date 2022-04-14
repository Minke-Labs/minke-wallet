import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useLocation } from '@hooks';
import styles from './OnrampButton.styles';
import { chooseLocation } from './OnrampButton.utils';
import { OnrampButtonProps } from './OnrampButton.types';

const OnrampButton: React.FC<OnrampButtonProps> = ({ onPress, marginBottom = 0, disabled = false }) => {
	const { location } = useLocation();

	if (!chooseLocation(location)) return null;

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				styles.container,
				{
					backgroundColor: chooseLocation(location)?.backgroundColor,
					marginBottom
				}
			]}
			{...{ onPress, disabled }}
		>
			<Text
				style={[
					styles.text,
					{ color: chooseLocation(location)?.fontColor }
				]}
			>
				Pay With
			</Text>
			<Image source={chooseLocation(location)?.image} style={styles.image} />
		</TouchableOpacity>
	);
};

export default OnrampButton;
