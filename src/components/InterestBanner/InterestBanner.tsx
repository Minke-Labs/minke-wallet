import React from 'react';
import { View } from 'react-native';
import { useLanguage, useTheme } from '@hooks';
import { addColorOpacity } from '@helpers/utilities';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import Token from '../Token/Token';
import { InterestBannerProps } from './InterestBanner.types';
import { makeStyles } from './InterestBanner.styles';

const Inner: React.FC<InterestBannerProps> = ({ token, bold, apy, depositProtocol }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(!!bold, colors);
	return (
		<View style={styles.container}>
			{token && (
				<Token token={{ symbol: depositProtocol?.id || '', address: '', decimals: 0, chainId: 0 }} size={16} />
			)}
			<Icon
				name="iconUp"
				color={bold ? 'text11' : 'alert3'}
				size={16}
				style={{
					marginRight: 8,
					...(token && { marginLeft: 4 })
				}}
			/>
			<Text
				weight={bold ? 'bold' : 'semiBold'}
				type={bold ? 'lMedium' : 'lSmall'}
				color={bold ? 'text11' : 'alert3'}
			>
				{apy}
				{i18n.t('Components.InterestBanner.interest')}
			</Text>
		</View>
	);
};

const InterestBanner: React.FC<InterestBannerProps> = ({ apy, depositProtocol, token = false, bold = false }) => {
	if (bold) {
		return (
			<View
				style={{
					padding: 4,
					borderRadius: 16,
					backgroundColor: addColorOpacity('#30C061', 0.4)
				}}
			>
				<Inner {...{ apy, token, bold }} />
			</View>
		);
	}

	return <Inner {...{ apy, token, bold, depositProtocol }} />;
};

export default InterestBanner;
