import React from 'react';
import { Image, Modal } from 'react-native';
import { useLanguage } from '@hooks';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import { LoadingScreenProps } from './LoadingScreen.types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title }) => {
	const { i18n } = useLanguage();
	return (
		<Modal visible>
			<View
				h="100%"
				w="100%"
				main="center"
				cross="center"
				bgc="background1"
			>
				<Image
					source={require('../../../assets/wave.gif')}
					style={{
						height: '100%',
						width: '100%',
						position: 'absolute'
					}}
				/>
				<View>
					<Text type="h2" weight="bold" mb="xxs" center>
						{title}
					</Text>
					<Text type="p2" center>
						{i18n.t('Components.LoadingScreen.this_can_take_a_few_seconds')}
					</Text>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingScreen;
