/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect, RefObject } from 'react';
import { Image, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';
import { Svg, Path } from 'react-native-svg';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ParaswapToken } from '../../model/token';
import { makeStyles } from './styles';

const TokenCard = ({
	token,
	onPress,
	balance,
	innerRef,
	disableMax = false,
	updateQuotes,
	conversionAmount = ''
}: {
	token: ParaswapToken | undefined;
	onPress: (() => void) | undefined;
	balance: string;
	innerRef: RefObject<TextInput>;
	disableMax?: boolean;
	updateQuotes: Function;
	conversionAmount?: string;
}) => {
	const [amount, setAmount] = useState('');
	const onChangeText = (value: string) => {
		let lastValid = amount;
		// eslint-disable-next-line no-useless-escape
		const validNumber = new RegExp(/^\d*\,?\d*$/); // for comma
		if (validNumber.test(value)) {
			lastValid = value;
		} else {
			lastValid = amount;
		}
		setAmount(lastValid);
	};

	useEffect(() => {
		setAmount('');
		updateQuotes(amount);
	}, [token]);

	useEffect(() => {
		if (!(conversionAmount && conversionAmount.replace(/\./g, ',') === amount)) {
			updateQuotes(amount);
		}
	}, [amount]);

	useEffect(() => {
		setAmount(conversionAmount.replace(/\./g, ','));
	}, [conversionAmount]);

	const isMaxEnabled = !disableMax && token && balance;
	const invalidAmount = isMaxEnabled && +balance < +amount.replace(/\,/g, '.');

	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<View style={styles.tokenCardWrap}>
			<View style={styles.tokenCardCoinContent}>
				<TouchableOpacity onPress={onPress}>
					{token ? (
						<View style={styles.tokenCardCoin}>
							<View style={styles.tokenImageContainer}>
								<Image source={{ uri: token.img }} style={styles.tokenImage} />
							</View>
							<Text style={styles.tokenName}>{token.symbol}</Text>
							<MaterialIcon name="chevron-right" color={colors.primary} size={20} />
						</View>
					) : (
						<View style={styles.selectTokenRow}>
							<View style={styles.currencyIcon}>
								<MaterialIcon name="currency-usd" color={colors.primary} size={20} />
							</View>
							<Text>Choose token</Text>
							<MaterialIcon name="chevron-right" color={colors.primary} size={20} />
						</View>
					)}
				</TouchableOpacity>
				<TextInput
					keyboardType="numeric"
					style={{
						backgroundColor: colors.background,
						color: colors.text,
						borderRadius: 41,
						borderColor: invalidAmount ? 'red' : '#D0D0D0',
						borderStyle: 'solid',
						borderWidth: 1,
						textAlign: 'right',
						paddingRight: 16,
						display: token ? 'flex' : 'none',
						flex: 1
					}}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
				/>
			</View>
			{isMaxEnabled ? (
				<TouchableOpacity
					onPress={() => setAmount(balance.replace(/\./g, ','))}
					style={styles.tokenCardMaxButton}
				>
					<View style={styles.tokenCardMaxButtonContent}>
						<Svg width={16} height={16} strokeWidth={1} fill={colors.primary} viewBox="0 0 16 16">
							<Path
								fill-rule="evenodd"
								clip-rule="evenodd"
								// eslint-disable-next-line max-len
								d="M3.91885 7.1401C4.13875 7.22226 4.34932 7.32304 4.54867 7.44056C5.13251 7.7847 5.62015 8.27234 5.9643 8.85618C6.08181 9.05553 6.18259 9.2661 6.26475 9.48601C6.32236 9.64018 6.37081 9.79895 6.40947 9.96165C6.41871 10.0005 6.42739 10.0397 6.43551 10.079L6.5438 10.6041C6.58037 10.7815 6.83369 10.7815 6.87026 10.6041L6.97856 10.079C6.98667 10.0397 6.99535 10.0005 7.00459 9.96165C7.04325 9.79895 7.0917 9.64018 7.14931 9.48601C7.23148 9.2661 7.33225 9.05553 7.44976 8.85618C7.79391 8.27234 8.28155 7.7847 8.86539 7.44055C9.06474 7.32304 9.27531 7.22227 9.49522 7.1401C9.64939 7.08249 9.80816 7.03404 9.97086 6.99538C10.0098 6.98614 10.0489 6.97746 10.0882 6.96935L10.6133 6.86105C10.7907 6.82448 10.7907 6.57116 10.6133 6.53459L10.0882 6.4263C10.0489 6.41818 10.0098 6.4095 9.97086 6.40026C9.80816 6.3616 9.64939 6.31315 9.49522 6.25554C9.27531 6.17338 9.06474 6.0726 8.86539 5.95509C8.28155 5.61094 7.79391 5.1233 7.44977 4.53946C7.33226 4.34011 7.23148 4.12954 7.14931 3.90964C7.09171 3.75546 7.04325 3.59669 7.00459 3.43399C6.99535 3.3951 6.98667 3.35597 6.97856 3.31663L6.87026 2.79151C6.83369 2.61417 6.58037 2.61417 6.5438 2.79151L6.43551 3.31663C6.42739 3.35597 6.41871 3.3951 6.40947 3.43399C6.37081 3.59669 6.32236 3.75546 6.26475 3.90963C6.18259 4.12954 6.08181 4.34011 5.9643 4.53946C5.62015 5.1233 5.13251 5.61094 4.54867 5.95509C4.34932 6.0726 4.13875 6.17338 3.91885 6.25554C3.76467 6.31315 3.6059 6.3616 3.4432 6.40026C3.40431 6.4095 3.36518 6.41818 3.32584 6.4263L2.80072 6.53459C2.62338 6.57116 2.62338 6.82448 2.80072 6.86105L3.32584 6.96935C3.36518 6.97746 3.40431 6.98614 3.4432 6.99538C3.60591 7.03404 3.76467 7.08249 3.91885 7.1401ZM2.53142 5.22873L3.05654 5.12044C4.09954 4.90535 4.91456 4.09033 5.12965 3.04733L5.23795 2.52221C5.56709 0.926153 7.84697 0.926167 8.17612 2.52221L8.28441 3.04733C8.4995 4.09033 9.31452 4.90535 10.3575 5.12044L10.8826 5.22873C12.4787 5.55788 12.4787 7.83776 10.8826 8.16691L10.3575 8.2752C9.31452 8.49029 8.4995 9.30531 8.28441 10.3483L8.17612 10.8734C7.84697 12.4695 5.56709 12.4695 5.23794 10.8734L5.12965 10.3483C4.91456 9.30531 4.09954 8.49029 3.05654 8.2752L2.53142 8.16691C0.935363 7.83776 0.935379 5.55788 2.53142 5.22873Z"
								fill={colors.primary}
							/>
							<Path
								fill-rule="evenodd"
								clip-rule="evenodd"
								// eslint-disable-next-line max-len
								d="M11.4316 12.5064C11.4643 12.5541 11.494 12.6042 11.5204 12.6563C11.5296 12.6743 11.5384 12.6926 11.5467 12.7111C11.5566 12.7329 11.5659 12.7551 11.5746 12.7775L11.7714 13.2849C11.7826 13.3138 11.8238 13.3131 11.834 13.2838L11.9949 12.8214C12.008 12.7839 12.0227 12.7472 12.0388 12.7113C12.0612 12.6619 12.0863 12.6141 12.1142 12.5682C12.13 12.5422 12.1466 12.5168 12.1641 12.492C12.2536 12.3649 12.3647 12.2544 12.4924 12.1655C12.5258 12.1423 12.5603 12.1205 12.5959 12.1003C12.6314 12.0802 12.6679 12.0616 12.7053 12.0447C12.7388 12.0295 12.7731 12.0157 12.8081 12.0033L13.2833 11.8346C13.3126 11.8242 13.313 11.7829 13.2838 11.772L12.7877 11.5867C12.7597 11.5763 12.7321 11.5649 12.7051 11.5527C12.6818 11.5422 12.6588 11.531 12.6363 11.5192C12.5888 11.4944 12.5429 11.4668 12.4991 11.4366C12.37 11.348 12.2576 11.2373 12.1671 11.1098C12.1523 11.0891 12.1382 11.0679 12.1246 11.0463C12.0926 10.9952 12.0638 10.9417 12.0388 10.8862C12.0236 10.8527 12.0098 10.8184 11.9974 10.7834L11.8339 10.3224C11.8236 10.2934 11.7828 10.2927 11.7715 10.3213L11.5713 10.8276C11.5636 10.8473 11.5553 10.8668 11.5467 10.886C11.5361 10.9095 11.5248 10.9326 11.513 10.9553C11.4876 11.0038 11.4593 11.0506 11.4284 11.0953C11.3383 11.2258 11.2256 11.3391 11.0958 11.43C11.0589 11.4558 11.0206 11.4798 10.981 11.5019C10.9483 11.5202 10.9146 11.5371 10.8802 11.5526C10.8586 11.5624 10.8366 11.5716 10.8144 11.5803L10.3207 11.7722C10.2921 11.7833 10.2925 11.8239 10.3213 11.8345L10.7936 12.009C10.8231 12.0199 10.852 12.0318 10.8804 12.0446C10.9301 12.0671 10.9782 12.0925 11.0244 12.1205C11.0511 12.1368 11.0772 12.154 11.1026 12.172C11.2311 12.2631 11.3425 12.3763 11.4316 12.5064ZM11.1332 11.09L11.3666 11.0072L11.1332 11.09ZM12.4732 12.4289L12.1934 12.5375L12.4732 12.4289ZM10.3315 13.2597L9.85911 13.0852C8.67909 12.6491 8.66514 10.9851 9.83771 10.5294L10.3314 10.3375L10.5315 9.83118C10.9958 8.65665 12.6683 8.68635 13.0905 9.87664L13.254 10.3376L13.7502 10.5229C14.9453 10.9691 14.9316 12.6644 13.7293 13.0912L13.2541 13.2598L13.0932 13.7222C12.6752 14.9228 10.9881 14.9523 10.5283 13.7671L10.3315 13.2597Z"
								fill={colors.primary}
							/>
						</Svg>
						<Text style={styles.tokenCardMaxButtonText}>Max</Text>
					</View>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export default TokenCard;
