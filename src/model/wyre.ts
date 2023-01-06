import { get, pick, split } from 'lodash';

import {
	WYRE_ACCOUNT_ID, WYRE_ACCOUNT_ID_TEST, WYRE_MERCHANT_ID, WYRE_MERCHANT_ID_TEST, WYRE_TOKEN,
	WYRE_TOKEN_TEST
} from '@env';
// @ts-expect-error
import { PaymentRequest } from '@rainbow-me/react-native-payments';
import { captureException } from '@sentry/react-native';
import { WyreReferenceInfo } from '@stores/TopUpStore';

import { fiatCurrencies } from './currency';
import { Network } from './network';
import { Currency } from './types/currency.types';
import { ApplePayResponse } from './types/wyre.types';

const WYRE_ENDPOINT_TEST = 'https://api.testwyre.com';
const WYRE_ENDPOINT = 'https://api.sendwyre.com';

const wyreApi = {
	post: async (url: string, data: any, headers?: any) => {
		const requestOptions = {
			method: 'post',
			headers,
			body: JSON.stringify(data)
		};
		const result = await fetch(url, requestOptions);
		return result.json();
	},

	get: async (url: string) => {
		const result = await fetch(url);
		return result.json();
	}
};

const getBaseUrl = ({ testnet }: Network) => (testnet ? WYRE_ENDPOINT_TEST : WYRE_ENDPOINT);

const getWyrePaymentDetails = ({
	sourceAmount,
	destAmount,
	sourceCurrency,
	destCurrency,
	networkFee,
	purchaseFee,
	totalAmount
}: {
	sourceAmount: number;
	destAmount: number;
	sourceCurrency: string;
	destCurrency: string;
	networkFee: number;
	purchaseFee: number;
	totalAmount: number;
}) => {
	const items = {
		displayItems: [
			{
				amount: { currency: sourceCurrency, value: sourceAmount - purchaseFee },
				label: `${destAmount} ${destCurrency}`
			},
			{
				amount: { currency: sourceCurrency, value: purchaseFee },
				label: 'Purchase Fee'
			}
		],

		id: 'minke-wyre',

		total: {
			amount: { currency: sourceCurrency, value: totalAmount },
			label: 'Minke'
		}
	};

	if (networkFee > 0) {
		items.displayItems.push({
			amount: { currency: sourceCurrency, value: networkFee },
			label: 'Network Fee'
		});
	}
	return items;
};

export const showApplePayRequest = async ({
	sourceCurrency,
	destCurrency,
	destAmount,
	sourceAmountWithFees,
	purchaseFee,
	sourceAmount,
	network,
	country
}: {
	sourceCurrency: string;
	destCurrency: string;
	sourceAmountWithFees: number;
	purchaseFee: number;
	sourceAmount: number;
	destAmount: number;
	network: Network;
	country: string;
}): Promise<ApplePayResponse> => {
	const feeAmount = sourceAmountWithFees - sourceAmount;
	const networkFee = feeAmount - purchaseFee;

	const merchantIdentifier = network.testnet ? WYRE_MERCHANT_ID_TEST : WYRE_MERCHANT_ID;

	const methodData = [
		{
			data: {
				countryCode: country,
				currencyCode: sourceCurrency,
				merchantIdentifier,
				supportedNetworks: ['visa', 'mastercard', 'discover']
			},
			supportedMethods: ['apple-pay']
		}
	];

	const paymentDetails = getWyrePaymentDetails({
		sourceAmount,
		destAmount,
		sourceCurrency,
		destCurrency: destCurrency === 'MUSDC' ? 'USDC' : destCurrency,
		networkFee,
		purchaseFee,
		totalAmount: sourceAmountWithFees
	});

	const paymentOptions = {
		requestBilling: true,
		requestPayerEmail: true,
		requestPayerPhone: true
	};

	const paymentRequest = new PaymentRequest(methodData, paymentDetails, paymentOptions);
	try {
		const paymentResponse = await paymentRequest.show();
		return { paymentResponse };
	} catch (error: any) {
		captureException(error);

		if (error.message !== 'AbortError') {
			return { error: { description: error.message as string } };
		}
		return { paymentResponse: null, error: undefined }; // AbortError (user closed the apple modal)
	}
};

export const getWalletOrderQuotation = async ({
	sourceAmount,
	destCurrency,
	accountAddress,
	network,
	destAmount,
	country,
	sourceCurrency
}: {
	sourceAmount: number | undefined;
	destCurrency: string;
	accountAddress: string;
	network: Network;
	destAmount: number | undefined;
	country: string;
	sourceCurrency: string;
}) => {
	const partnerId = network.testnet ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
	const dest = `${network.wyreSRN}:${accountAddress}`;
	const data = {
		accountId: partnerId,
		country,
		dest,
		destCurrency,
		sourceCurrency,
		walletType: 'APPLE_PAY',
		amountIncludeFees: !!sourceAmount,
		sourceAmount,
		destAmount
	};

	const baseUrl = getBaseUrl(network);
	const wyreAuthToken = network.testnet ? WYRE_TOKEN_TEST : WYRE_TOKEN;
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${wyreAuthToken}`
	};
	const response = await wyreApi.post(`${baseUrl}/v3/orders/quote/partner`, data, headers);
	if (response.fees) {
		const purchaseFee = response?.fees[sourceCurrency];
		return {
			purchaseFee,
			sourceAmountWithFees: response?.sourceAmount,
			destAmount: response?.destAmount
		};
	}
	const { errorCode, message } = response;
	return { errorCode, message };
};

export const reserveWyreOrder = async ({
	sourceAmount,
	destAmount,
	destCurrency,
	sourceCurrency,
	accountAddress,
	network,
	country
}: {
	sourceAmount: number | undefined;
	destAmount: number | undefined;
	destCurrency: string;
	sourceCurrency: string;
	accountAddress: string;
	network: Network;
	paymentMethod?: string;
	country: string;
}) => {
	const partnerId = network.testnet ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
	const dest = `${network.wyreSRN}:${accountAddress}`;
	const data = {
		sourceAmount,
		dest,
		destCurrency,
		referrerAccountId: partnerId,
		sourceCurrency,
		amountIncludeFees: !!sourceAmount,
		country,
		paymentMethod: 'apple-pay',
		destAmount
	};

	const baseUrl = getBaseUrl(network);
	const wyreAuthToken = network.testnet ? WYRE_TOKEN_TEST : WYRE_TOKEN;
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${wyreAuthToken}`
	};

	const response = await wyreApi.post(`${baseUrl}/v3/orders/reserve`, data, headers);
	return response;
};

export const trackWyreOrder = async (referenceInfo: any, orderId: any, network: Network) => {
	const baseUrl = getBaseUrl(network);
	const response = await wyreApi.get(`${baseUrl}/v3/orders/${orderId}`);
	const orderStatus = get(response, 'status');
	const transferId = get(response, 'transferId');
	return { data: response, orderStatus, transferId };
};

export const trackWyreTransfer = async (transferId: any, network: Network) => {
	const baseUrl = getBaseUrl(network);
	const response = await wyreApi.get(`${baseUrl}/v2/transfer/${transferId}/track`);
	const transferHash = get(response, 'blockchainNetworkTx');
	const destAmount = get(response, 'destAmount');
	const destCurrency = get(response, 'destCurrency');
	return { destAmount, destCurrency, transferHash };
};

const getAddressDetails = (addressInfo: any) => {
	const { name, postalAddress: address } = addressInfo;
	const addressLines = split(address.street, '\n');
	return {
		addressLines,
		administrativeArea: address.state,
		country: address.country,
		countryCode: address.ISOCountryCode,
		familyName: name.familyName,
		givenName: name.givenName,
		locality: address.city,
		postalCode: address.postalCode,
		subAdministrativeArea: address.subAdministrativeArea,
		subLocality: address.subLocality
	};
};

const createPayload = ({
	referenceInfo,
	paymentResponse,
	amount,
	accountAddress,
	destCurrency,
	sourceCurrency,
	network,
	reservationId
}: {
	referenceInfo: WyreReferenceInfo;
	paymentResponse: any;
	amount: number;
	accountAddress: string;
	destCurrency: string;
	sourceCurrency: string;
	network: Network;
	reservationId: any;
}) => {
	const { testnet, wyreSRN } = network;
	const dest = `${wyreSRN}:${accountAddress}`;

	const {
		details: {
			billingContact: billingInfo,
			paymentData,
			paymentMethod,
			shippingContact: shippingInfo,
			transactionIdentifier
		}
	} = paymentResponse;
	const billingContact = getAddressDetails(billingInfo);
	const shippingContact = {
		...billingContact,
		emailAddress: shippingInfo.emailAddress,
		phoneNumber: shippingInfo.phoneNumber
	};

	const partnerId = testnet ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
	return {
		partnerId,
		payload: {
			orderRequest: {
				amount,
				dest,
				destCurrency,
				referenceId: referenceInfo.referenceId,
				referrerAccountId: partnerId,
				reservationId,
				sourceCurrency
			},
			paymentObject: {
				billingContact,
				shippingContact,
				token: {
					paymentData,
					paymentMethod: {
						...paymentMethod,
						type: 'debit'
					},
					transactionIdentifier
				}
			}
		}
	};
};

export const getOrderId = async ({
	referenceInfo,
	paymentResponse,
	amount,
	accountAddress,
	destCurrency,
	sourceCurrency,
	network,
	reservationId
}: {
	referenceInfo: WyreReferenceInfo;
	paymentResponse: any;
	amount: any;
	accountAddress: any;
	destCurrency: any;
	sourceCurrency: any;
	network: any;
	reservationId: any;
}) => {
	const data = createPayload({
		referenceInfo,
		paymentResponse,
		amount,
		accountAddress,
		sourceCurrency,
		destCurrency,
		network,
		reservationId
	});
	try {
		const baseUrl = getBaseUrl(network);
		const wyreAuthToken = network.testnet ? WYRE_TOKEN_TEST : WYRE_TOKEN;
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${wyreAuthToken}`
		};
		const response = await wyreApi.post(`${baseUrl}/v3/apple-pay/process/partner`, data, headers);
		const orderId = get(response, 'id', null);
		const authenticationUrl = get(response, 'authenticationUrl', null);

		if (orderId) {
			return { orderId, authenticationUrl };
		}

		const { errorCode, message, type } = response;
		return {
			errorCategory: type,
			errorCode,
			errorMessage: message
		};
	} catch (error: any) {
		const {
			data: { errorCode, message, type }
		} = error;
		return {
			errorCategory: type,
			errorCode,
			errorMessage: message
		};
	}
};

export const availableFiatCurrencies: { [key: string]: Currency } = pick(
	fiatCurrencies,
	'USD',
	'EUR',
	'GBP',
	'AUD',
	'CAD',
	'CZK',
	'NZD',
	'ARS',
	'BRL',
	'CHF',
	'CLP',
	'COP',
	'DKK',
	'HKD',
	'ILS',
	'INR',
	'ISK',
	'JPY',
	'KRW',
	'MXN',
	'MYR',
	'NOK',
	'PHP',
	'PLN',
	'SEK',
	'SGD',
	'THB',
	'VND',
	'ZAR'
);
