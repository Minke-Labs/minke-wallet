import React from 'react';
import { View, ImageBackground, Image, SafeAreaView } from 'react-native';
import { useTheme, useDepositProtocols } from '@hooks';
import {
	wavesBackground,
	krakenAave2,
	krakenMStable
} from '@images';
import { Header } from '@components';
import { makeStyles } from './Background.styles';

export const Background: React.FC = ({ children }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { selectedProtocol } = useDepositProtocols();
	return (
		<View style={styles.backgroundContainer}>
			<View style={styles.imagesContainer}>
				<ImageBackground
					source={wavesBackground}
					style={styles.bgImage}
				/>
				<Image
					source={selectedProtocol?.id === 'aave' ? krakenAave2 : krakenMStable}
					style={styles.krakenImage}
				/>
				<View>
					<SafeAreaView />
					<Header title="Save" />
				</View>

			</View>
			<View style={styles.contentContainer}>
				{children}
			</View>
		</View>
	);
};
