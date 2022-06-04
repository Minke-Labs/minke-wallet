import React from 'react';
import { View } from 'react-native';
import { Text, Header, Token, HapticButton } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTheme } from '@hooks';
import DirectionButton from '../ExchangeScreen/DirectionButton/DirectionButton';

interface PaperProps {
	marginBottom?: number;
	padding?: number;
}

const Paper: React.FC<PaperProps> = ({ children, marginBottom, padding }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				marginHorizontal: 16,
				backgroundColor: colors.background5,
				borderRadius: 16,
				marginBottom,
				padding,
				overflow: 'hidden'
			}}
		>
			{children}
		</View>
	);
};

const ExchangeResumeScreen = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	return (
		<BasicLayout>
			<Header
				title="Confirmation"
				marginBottom={36}
			/>

			<Paper marginBottom={24}>
				<View
					style={{
						borderBottomWidth: 1,
						borderBottomColor: colors.background1,
						flexDirection: 'row'
					}}
				>

					<View
						style={{
							flex: 1,
							borderRightWidth: 1,
							borderRightColor: colors.background1,
							paddingTop: 28,
							paddingBottom: 14,
							alignItems: 'center'
						}}
					>
						<Token name="eth" size={48} />
						<Text
							style={{ marginTop: 16 }}
							marginBottom={4}
							weight="semiBold"
							type="lMedium"
						>
							$4000
						</Text>
						<Text>A</Text>
					</View>
					<View
						style={{
							flex: 1,
							paddingTop: 28,
							paddingBottom: 14,
							alignItems: 'center'
						}}
					>
						<Token name="matic" size={48} />
						<Text
							style={{ marginTop: 16 }}
							marginBottom={4}
							weight="semiBold"
							type="lMedium"
						>
							$3999.99
						</Text>
						<Text>B</Text>
					</View>

					<DirectionButton onPress={() => null} disabled />
				</View>

				<View style={{ paddingVertical: 12, alignItems: 'center' }}>
					<Text type="lSmall" weight="semiBold">Rate fixed for:</Text>
				</View>
			</Paper>

			<Paper marginBottom={24} padding={24}>
				<View
					style={{
						marginBottom: 16,
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<Text weight="semiBold" color="text3" type="lMedium">Rate</Text>
					<Text weight="bold" color="text2" type="tSmall">2000 DAI per 1 ETH</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<Text weight="semiBold" color="text3" type="lMedium">Swapping via</Text>
					<Text weight="bold" color="text2" type="tSmall">Uniswap v2 🦄</Text>
				</View>
			</Paper>

			<Paper padding={16}>
				<Text>ExchangeResumeScreen</Text>
				<Text>ExchangeResumeScreen</Text>
			</Paper>

			<View style={{ marginTop: 'auto', marginBottom: 32, marginHorizontal: 16 }}>
				<HapticButton
					title={i18n.t('Components.Buttons.exchange')}
					onPress={() => null}
				/>
			</View>
		</BasicLayout>
	);
};

export default ExchangeResumeScreen;
