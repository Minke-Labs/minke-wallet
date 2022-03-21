import React from 'react';
import { View, Image, Modal } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import styles from './LoadingScreen.styles';
import { LoadingScreenProps } from './LoadingScreen.types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title }) => {
	const { colors } = useTheme();
	return (
		<Modal visible>
			<View style={[styles.container, { backgroundColor: colors.background1 }]}>
				<Image style={styles.image} source={require('../../../assets/wave.gif')} />
				<View>
					<Text type="h2" weight="bold" marginBottom={8} center>
						{title}
					</Text>
					<Text type="p2" center>
						This can take a few seconds...
					</Text>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingScreen;
