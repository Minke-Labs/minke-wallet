import React, { useState } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import styles from './OnrampButton.styles';
import { chooseLocation } from './OnrampButton.utils';
import { OnrampButtonProps } from './OnrampButton.types';

const OnrampButton: React.FC<OnrampButtonProps> = ({ onPress, marginBottom = 0, disabled = false }) => {
	const [location] = useState('Australia');

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[
				styles.container,
				{
					backgroundColor: chooseLocation(location).backgroundColor,
					marginBottom
				}
			]}
		>
			<Text
				style={[
					styles.text,
					{
						color: chooseLocation(location).fontColor
					}
				]}
			>
				Pay With
			</Text>
			<Image source={chooseLocation(location).image} style={styles.image} />
		</TouchableOpacity>
	);
};

export default OnrampButton;
