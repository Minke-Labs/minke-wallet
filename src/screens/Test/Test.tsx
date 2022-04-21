import React from 'react';
import { View, Button } from 'react-native';
import { Text } from '@components';
import { BasicLayout } from '@layouts';
import * as Haptics from 'expo-haptics';

const Test = () => (
	<BasicLayout>
		<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
			<View>
				<Text>Haptics.selectionAsync</Text>
				<View>
					<Button title="Selection" onPress={() => Haptics.selectionAsync()} />
				</View>
				<Text>Haptics.notificationAsync</Text>
				<View>
					<Button
						title="Success"
						onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}
					/>
					<Button
						title="Error"
						onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)}
					/>
					<Button
						title="Warning"
						onPress={() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)}
					/>
				</View>
				<Text>Haptics.impactAsync</Text>
				<View>
					<Button title="Light" onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)} />
					<Button title="Medium" onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} />
					<Button title="Heavy" onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)} />
				</View>
			</View>
		</View>
	</BasicLayout>
);

export default Test;
