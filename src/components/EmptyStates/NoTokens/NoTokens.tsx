import React from 'react';
import { Image, View } from 'react-native';
import { whale2Img } from '@images';
import { useLanguage, useNetwork } from '@hooks';
import Text from '../../Text/Text';
import { styles } from './NoTokens.styles';

const NoTokens = () => {
	const { i18n } = useLanguage();
	const {
		network: { name: network }
	} = useNetwork();
	return (
		<View style={styles.container}>
			<Image source={whale2Img} style={styles.image} />
			<Text color="text4" weight="medium" marginBottom={16}>
				{i18n.t('Components.EmptyStates.NoTokens.no_tokens_here', { network })}
			</Text>
		</View>
	);
};

export default NoTokens;
