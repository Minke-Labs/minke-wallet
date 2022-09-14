import React from 'react';
import { Text, View } from '@components';
import { useLanguage } from '@hooks';
import { numberFormat } from '@helpers/utilities';

interface MarketCapProps {
	marketCap: number;
	tokenVolume: any;
}

const MarketCap: React.FC<MarketCapProps> = ({ marketCap, tokenVolume }) => {
	const { i18n } = useLanguage();
	const lastVolume = tokenVolume[tokenVolume.length - 1][1];
	return (
		<View mb="xs" br="xs" bgc="background2">

			<View pt="xs" ph="s">
				<Text mb="xxs" color="text4" type="bMedium">
					{i18n.t('InvestmentsDetailScreen.MarketCap.market_cap')}
				</Text>
				<Text weight="bold" type="hMedium" mb="xs">
					{numberFormat(marketCap)}
				</Text>
			</View>

			<View bgc="background1" h={1} />

			<View pt="xs" ph="s">
				<Text mb="xxs" color="text4" type="bMedium">
					{i18n.t('InvestmentsDetailScreen.MarketCap.volume')}
				</Text>
				<Text weight="bold" type="hMedium" mb="xs">
					{numberFormat(lastVolume)}
				</Text>
			</View>

		</View>
	);
};

export default MarketCap;
