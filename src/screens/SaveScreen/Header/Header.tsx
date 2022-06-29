import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation, useLanguage } from '@hooks';
import { Text, Icon } from '@components';
import styles from './Header.styles';

export const Header: React.FC<{ onInfo?: () => void }> = ({ onInfo }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View style={styles.headerNavigation}>
			<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text weight="extraBold" style={{ marginLeft: 12 }}>
					{i18n.t('SaveScreen.Header.save')}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onInfo}>
				<Icon
					name="infoStroke"
					color="text7"
					size={24}
				/>
			</TouchableOpacity>
		</View>
	);
};
