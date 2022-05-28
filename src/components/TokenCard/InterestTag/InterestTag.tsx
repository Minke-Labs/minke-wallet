import React from 'react';
import { View } from 'react-native';
import { useDepositProtocols, useLanguage, useTheme } from '@hooks';
import { TokenType } from '@styles';
import Text from '../../Text/Text';
import Icon from '../../Icon/Icon';
import Token from '../../Token/Token';

export const InterestTag: React.FC<{ apy: string; }> = ({ apy }) => {
	const { colors } = useTheme();
	const { selectedProtocol } = useDepositProtocols();
	const { i18n } = useLanguage();
	return (
		<View style={{
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 4,
			paddingHorizontal: 12,
			borderRadius: 8,
			backgroundColor: colors.alert4
		}}
		>
			<Token
				name={selectedProtocol?.id as TokenType}
				size={16}
			/>
			<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8, marginLeft: 4 }} />
			<Text weight="medium" type="a" color="alert3">
				{apy}{i18n.t('Components.TokenCard.InterestTag.interest')}
			</Text>
		</View>
	);
};
