import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { availableDepositProtocols } from '@models/deposit';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useLanguage } from '@hooks';
import { networks } from '@models/network';
import View from '../../View/View';
import Text from '../../Text/Text';
import Touchable from '../../Touchable/Touchable';
import ModalHeader from '../../ModalHeader/ModalHeader';
import Token from '../../Token/Token';
import Icon from '../../Icon/Icon';
import { SearchDepositProtocolsProps } from './SearchDepositProtocols.types';

const SearchDepositProtocols: React.FC<SearchDepositProtocolsProps> = ({
	visible,
	onDismiss,
	selectedProtocol,
	onChangeDepositProtocol
}) => {
	const { i18n } = useLanguage();
	if (!visible) {
		return null;
	}

	return (
		<SafeAreaView>
			<ModalHeader title={i18n.t('SavingAccountsScreen.title')} {...{ onDismiss }} />
			<View ph="s">
				<FlatList
					data={Object.values(availableDepositProtocols)}
					keyExtractor={(protocol) => protocol.id}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => {
						const selected = selectedProtocol === item;
						const { chainIds } = item;
						const nws = Object.values(networks).filter((n) => chainIds.includes(n.chainId));
						return (
							<Touchable
								onPress={() => onChangeDepositProtocol(item)}
								disabled={selected}
								row
								cross="center"
								h={64}
								main="space-between"
							>
								<View row cross="center" w="70%">
									<Token
										token={{ symbol: item.icon || '', address: '', decimals: 0, chainId: 0 }}
										size={40}
									/>
									<View ml="xs">
										<Text type="lSmall" color="text2">
											{nws.map((n) => n.name).join(' & ')}
										</Text>
										<Text type="bMedium" weight="bold">
											{item.name}
										</Text>
									</View>
								</View>

								<View style={{ width: 24 }}>{selected && <Icon name="checkColor" size={24} />}</View>
							</Touchable>
						);
					}}
				/>

				<KeyboardSpacer />
			</View>
		</SafeAreaView>
	);
};

export default SearchDepositProtocols;
