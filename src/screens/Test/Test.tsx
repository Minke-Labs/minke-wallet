import React from 'react';
import { WelcomeLayout } from '@layouts';
import { ColorType } from '@styles';
import { useTheme } from '@hooks';
import { View, StyleSheet } from 'react-native';

const makeStyles = (colors: ColorType) =>
	StyleSheet.create({
		box: {
			height: 50,
			width: 50,
			borderRadius: 12,
			backgroundColor: colors.alert1,
			marginBottom: 10
		},
		box2: {
			height: 50,
			width: 50,
			borderRadius: 12
		}
	});

const Test = () => {
	const { colors } = useTheme();
	const style = makeStyles(colors);
	return (
		<WelcomeLayout center>
			<View style={style.box} />
			<View style={[style.box2, { backgroundColor: colors.alert3 }]} />
		</WelcomeLayout>
	);
};

export default Test;
