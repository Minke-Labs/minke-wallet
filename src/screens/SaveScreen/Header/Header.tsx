import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@hooks';
import { Text, Icon } from '@components';
import i18n from '@localization';
import styles from './Header.styles';

export const Header = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.headerNavigation}>
			<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text weight="extraBold" style={{ marginLeft: 12 }}>
					{i18n.t('saveScreen.Header.save')}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon name="infoStroke" color="text7" size={24} />
			</TouchableOpacity>
		</View>
	);
};
