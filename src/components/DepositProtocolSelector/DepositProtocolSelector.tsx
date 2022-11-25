import React from 'react';
import { useLanguage } from '@hooks';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import Token from '@src/components/Token/Token';
import Touchable from '@src/components/Touchable/Touchable';
import { DepositProtocolSelectorProps, TitlesProps } from './DepositProtocolSelector.types';

const NoTokenIcon: React.FC = () => (
	<View round={40} bgc="background6" main="center" cross="center">
		<Icon name="vault" color="cta1" size={30} />
	</View>
);

const Titles: React.FC<TitlesProps> = ({ protocol }) => {
	const { name } = protocol;
	return (
		<View row cross="center" main="space-between">
			<Text type="p2" style={{ marginRight: 8 }} weight="extraBold">
				{name}
			</Text>
		</View>
	);
};

const TitlesEmpty = () => {
	const { i18n } = useLanguage();
	return (
		<View row cross="center">
			<Text type="p2" weight="medium">
				{i18n.t('Components.DepositProtocolSelector.choose_protocol')}
			</Text>
			<View mr="xxxs" />
			<Icon name="chevronDown" color="cta1" size={16} />
		</View>
	);
};

const DepositProtocolSelector: React.FC<DepositProtocolSelectorProps> = ({ onPress, protocol }) => {
	const { i18n } = useLanguage();

	return (
		<Touchable onPress={onPress} opacity={0.6}>
			<View row cross="center">
				{protocol ? (
					<Token token={{ symbol: protocol.icon, address: '', chainId: 0, decimals: 0 }} size={32} />
				) : (
					<NoTokenIcon />
				)}
				<View row cross="center" main="space-between" flex1>
					<View ml="xs">{protocol ? <Titles {...{ protocol }} /> : <TitlesEmpty />}</View>
					<Text type="lMedium" weight="bold" color="cta1">
						{i18n.t('Components.DepositProtocolSelector.change_account')}
					</Text>
				</View>
			</View>
		</Touchable>
	);
};

export default DepositProtocolSelector;
