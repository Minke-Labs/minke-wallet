import React from 'react';
import { View } from 'react-native';
import { useLanguage, useNavigation } from '@hooks';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import Touchable from '../Touchable/Touchable';
import styles from './SettingsHeader.styles';
import { SettingsHeaderProps } from './SettingsHeader.types';

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onPress, done = true, title }) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();

	const goBack = () => navigation.goBack();

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<Touchable
					style={{ flexDirection: 'row', alignContent: 'center' }}
					onPress={goBack}
				>
					<Icon name="arrowBackStroke" color="text7" size={24} style={{ marginRight: 12 }} />
					<Text weight="extraBold">{title}</Text>
				</Touchable>
			</View>
			{done && (
				<Touchable {...{ onPress }}>
					<Text weight="medium" color="text7" type="a">
						{i18n.t('Components.SettingsHeader.done')}
					</Text>
				</Touchable>
			)}
		</View>
	);
};

export default SettingsHeader;
