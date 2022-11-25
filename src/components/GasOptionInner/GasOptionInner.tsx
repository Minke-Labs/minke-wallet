import React from 'react';
import { useLanguage, useNativeToken } from '@hooks';
import { tokenBalanceFormat } from '@helpers/utilities';
import { Network } from '@models/network';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Token from '../Token/Token';

interface GasOptionInnerProps {
	type: 'normal' | 'fast' | 'slow';
	gasPrice: number;
	usdPrice: number;
	waiting: string | null;
	gasLimit: number;
	network: Network;
}

const GasOptionInner: React.FC<GasOptionInnerProps> = ({ type, waiting, gasPrice, usdPrice, gasLimit, network }) => {
	const { i18n } = useLanguage();
	const { nativeToken } = useNativeToken(network);
	return (
		<>
			<View bgc="background6" round={36} main="center" cross="center" mr="xs" ml="xxxs">
				<Icon name={type === 'fast' ? 'boltStroke' : 'clockStroke'} size={20} color="cta1" />
			</View>

			<View row main="space-between" flex1>
				<View>
					<Text type="span" weight="bold">
						{i18n.t(`ExchangeScreen.GasSelector.GasOption.${type}`)}
					</Text>
					<View mb="xxxs" />
					<Text type="span">{waiting}</Text>
				</View>

				<View>
					<Text type="span" weight="bold" style={{ alignSelf: 'flex-end' }}>
						${tokenBalanceFormat(gasPrice * gasLimit * 10 ** -9 * usdPrice, 5)}{' '}
					</Text>
					<View mb="xxxs" />
					{!!nativeToken && (
						<View row main="center">
							<Text type="span">{i18n.t('ExchangeScreen.GasSelector.GasOption.fee_paid_in')}</Text>
							<View main="center">
								<Token token={nativeToken} size={12} showNetworkIcon={false} />
							</View>
							<Text type="span" weight="bold">
								{' '}
								{nativeToken.symbol}
							</Text>
						</View>
					)}
				</View>
			</View>
		</>
	);
};

export default GasOptionInner;
