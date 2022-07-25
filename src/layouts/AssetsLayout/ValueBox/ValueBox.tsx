import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import Header from '../Header/Header';
import { ValueBoxProps } from './ValueBox.types';
import styles from './ValueBox.styles';
import { Background } from './Background/Background';

const ValueBox: React.FC<ValueBoxProps> = ({ value, title }) => (
	<Background>
		<Header />
		<View style={styles.container}>
			{title}
			<Text weight="medium" type="textLarge" marginBottom={10}>
				{value}
			</Text>
		</View>
	</Background>
);

export default ValueBox;
