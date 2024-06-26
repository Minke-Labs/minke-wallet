import React from 'react';
import { View } from 'react-native';
import { useTheme, useNavigation, useLanguage } from '@hooks';
import { FlatList } from 'react-native-gesture-handler';
import { numberFormat, tokenBalanceFormat } from '@helpers/utilities';
import { Text, Button, Token } from '@components';
import { makeStyles } from './Body.styles';
import { BodyProps } from './Body.types';
import Card from './Card/Card';

export const Body: React.FC<BodyProps> = ({ interestTokens }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.depositCardContainer}>
			{interestTokens.length > 0 && (
				<View style={styles.actionDepositCard}>
					<FlatList
						keyExtractor={(item) => item.interestBearingToken!.address}
						data={interestTokens}
						showsVerticalScrollIndicator={false}
						renderItem={({ item, index }) => (
							<Card
								image={<Token token={item} size={32} />}
								title={item.name!}
								subtitle={i18n.t('SaveScreen.Body.deposit', {
									source: item.interestBearingToken!.source
								})}
								marginBottom={index === interestTokens.length - 1 ? 0 : 32}
								right={
									<View>
										<Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>
											{tokenBalanceFormat(item.balance!, 4)} {item.symbol}
										</Text>
										<Text type="p2" weight="bold" style={{ alignSelf: 'flex-end' }}>
											{numberFormat(+item.balance!, 2)}
										</Text>
									</View>
								}
							/>
						)}
					/>
				</View>
			)}
			<Button title={i18n.t('Components.Buttons.deposit')} onPress={() => navigation.navigate('DepositScreen')} />
		</View>
	);
};
