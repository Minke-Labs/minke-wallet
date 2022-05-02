import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from '@localization';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import styles from './SettingsHeader.styles';
import { SettingsHeaderProps } from './SettingsHeader.types';

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ onPress, done = true, title }) => (
	<View style={styles.container}>
		<View style={{ flexDirection: 'row' }}>
			<TouchableOpacity style={{ marginRight: 12 }} activeOpacity={0.6} {...{ onPress }}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
			</TouchableOpacity>
			<Text weight="extraBold">{title}</Text>
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

export default SettingsHeader;
