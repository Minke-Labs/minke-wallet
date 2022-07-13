import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useLanguage, useNavigation } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import styles from './SettingsHeader.styles';
import { SettingsHeaderProps } from './SettingsHeader.types';

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onPress, done = true, title }) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();

	const goBack = () => navigation.goBack();

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={{ flexDirection: 'row', alignContent: 'center' }}
					activeOpacity={0.6}
					onPress={goBack}
				>
					<Icon name="arrowBackStroke" color="text7" size={24} style={{ marginRight: 12 }} />
					<Text weight="extraBold">{title}</Text>
				</TouchableOpacity>
			</View>
			{done && (
				<TouchableOpacity activeOpacity={0.6} {...{ onPress }}>
					<Text weight="medium" color="text7" type="a">
						{i18n.t('Components.SettingsHeader.done')}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SettingsHeader;
