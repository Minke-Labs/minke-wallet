/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { WelcomeLayout } from '@layouts';
import { ColorType } from '@styles';
import { useTheme } from '@hooks';
import {
	Button,
	// Icon, Text, TextArea,
	Modal,
	Flag
} from '@components';
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
	const [text, setText] = useState('');
	const [isModalVisible, setModalVisible] = useState(false);

	return (
		<>
			<WelcomeLayout center>
				{/* <View style={style.box} />
				<View style={[style.box2, { backgroundColor: colors.alert3 }]} />
				<View style={{ marginBottom: 10 }} />

				<Button title="Open Modal" onPress={() => setModalVisible(true)} />
				<View style={{ marginBottom: 10 }} />

				<Icon name="closeStroke" size={24} color="text7" />
				<View style={{ marginBottom: 10 }} />

				<Text center weight="extraBold" type="h1" width={273} marginBottom={16}>
					Wave goodbye to your bank!
				</Text>
				<View style={{ marginBottom: 10 }} />

				<TextArea
					label="Seed phrase or private key"
					value={text}
					numberOfLines={6}
					onChangeText={(t) => setText(t)}
				/> */}
				<View style={{ marginBottom: 10 }} />

				<Flag name="hawaii" />
			</WelcomeLayout>

			<Modal center isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<Button title="Close Modal" onPress={() => setModalVisible(false)} />
				<View style={{ height: 350 }} />
			</Modal>
		</>
	);
};

export default Test;
