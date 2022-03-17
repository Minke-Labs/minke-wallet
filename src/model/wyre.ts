// @ts-expect-error
import { PaymentRequest } from '@rainbow-me/react-native-payments';
import { get, split } from 'lodash';
import {
	WYRE_MERCHANT_ID_TEST,
	WYRE_MERCHANT_ID,
	WYRE_ACCOUNT_ID_TEST,
	WYRE_ACCOUNT_ID,
	WYRE_TOKEN,
	WYRE_TOKEN_TEST
} from '@env';
import { Network } from './network';
import { WyreReferenceInfo } from '@stores/TopUpStore';

const SOURCE_CURRENCY_USD = 'USD';
const PAYMENT_PROCESSOR_COUNTRY_CODE = 'US';

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

const getBaseUrl = ({ testnet }: Network) => (true ? WYRE_ENDPOINT_TEST : WYRE_ENDPOINT);
// @ts-expect-error
const getWyrePaymentDetails = (sourceAmount, destCurrency, networkFee, purchaseFee, totalAmount) => ({
	displayItems: [
		{
			amount: { currency: SOURCE_CURRENCY_USD, value: sourceAmount },
			label: destCurrency
		},
		{
			amount: { currency: SOURCE_CURRENCY_USD, value: purchaseFee },
			label: 'Purchase Fee'
		},
		{
			amount: { currency: SOURCE_CURRENCY_USD, value: networkFee },
			label: 'Network Fee'
		}
	],

	id: 'minke-wyre',

	total: {
		amount: { currency: SOURCE_CURRENCY_USD, value: totalAmount },
		label: 'Minke'
	}
});

export const showApplePayRequest = async (
	referenceInfo: WyreReferenceInfo,
	destCurrency: any,
	sourceAmountWithFees: any,
	purchaseFee: any,
	sourceAmount: any,
	network: Network
) => {
	const feeAmount = sourceAmountWithFees - sourceAmount;
	const networkFee = feeAmount - purchaseFee;

	const merchantIdentifier = network.testnet || true ? WYRE_MERCHANT_ID_TEST : WYRE_MERCHANT_ID;

	const methodData = [
		{
			data: {
				countryCode: PAYMENT_PROCESSOR_COUNTRY_CODE,
				currencyCode: SOURCE_CURRENCY_USD,
				merchantIdentifier,
				supportedNetworks: ['visa', 'mastercard', 'discover']
			},
			supportedMethods: ['apple-pay']
		}
	];

	const paymentDetails = getWyrePaymentDetails(
		sourceAmount,
		destCurrency,
		networkFee,
		purchaseFee,
		sourceAmountWithFees
	);

	const paymentOptions = {
		requestBilling: true,
		requestPayerEmail: true,
		requestPayerPhone: true
	};

	console.log({ methodData });
	console.log({ paymentDetails });
	console.log({ paymentOptions });
	const paymentRequest = new PaymentRequest(methodData, paymentDetails, paymentOptions);
	try {
		const paymentResponse = await paymentRequest.show();
		return paymentResponse;
	} catch (error) {
		console.error(error);
		console.error({ referenceInfo });
		return null;
	}
};

export const getWalletOrderQuotation = async (
	amount: any,
	destCurrency: any,
	accountAddress: any,
	network: Network
) => {
	const partnerId = network.testnet || true ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
	const dest = `${network.wyreSRN}:${accountAddress}`;
	const data = {
		accountId: partnerId,
		amount,
		country: PAYMENT_PROCESSOR_COUNTRY_CODE,
		dest,
		destCurrency,
		sourceCurrency: SOURCE_CURRENCY_USD,
		walletType: 'APPLE_PAY'
	};
	const baseUrl = getBaseUrl(network);
	const wyreAuthToken = network.testnet || true ? WYRE_TOKEN_TEST : WYRE_TOKEN;
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${wyreAuthToken}`
	};
	const response = await wyreApi.post(`${baseUrl}/v3/orders/quote/partner`, data, headers);
	const purchaseFee = response?.fees[SOURCE_CURRENCY_USD];
	return {
		purchaseFee,
		sourceAmountWithFees: response?.sourceAmount
	};
};

export const reserveWyreOrder = async (
	amount: any,
	destCurrency: any,
	accountAddress: any,
	network: Network,
	paymentMethod = null
) => {
	const partnerId = network.testnet || true ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
	const dest = `${network.wyreSRN}:${accountAddress}`;
	const data = {
		amount,
		dest,
		destCurrency,
		referrerAccountId: partnerId,
		sourceCurrency: SOURCE_CURRENCY_USD
	};
	if (paymentMethod) {
		// @ts-expect-error
		data.paymentMethod = paymentMethod;
	}

	const baseUrl = getBaseUrl(network);
	const wyreAuthToken = network.testnet || true ? WYRE_TOKEN_TEST : WYRE_TOKEN;
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

export const trackWyreTransfer = async (referenceInfo: any, transferId: any, network: Network) => {
	const baseUrl = getBaseUrl(network);
	const response = await wyreApi.get(`${baseUrl}/v2/transfer/${transferId}/track`);
	console.log({ response });
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

const createPayload = (
	referenceInfo: WyreReferenceInfo,
	paymentResponse: any,
	amount: any,
	accountAddress: any,
	destCurrency: any,
	{ testnet, wyreSRN }: Network,
	reservationId: any
) => {
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

	const partnerId = testnet || true ? WYRE_ACCOUNT_ID_TEST : WYRE_ACCOUNT_ID;
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
				sourceCurrency: SOURCE_CURRENCY_USD
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

export const getOrderId = async (
	referenceInfo: WyreReferenceInfo,
	paymentResponse: any,
	amount: any,
	accountAddress: any,
	destCurrency: any,
	network: any,
	reservationId: any
) => {
	const data = createPayload(
		referenceInfo,
		paymentResponse,
		amount,
		accountAddress,
		destCurrency,
		network,
		reservationId
	);
	try {
		const baseUrl = getBaseUrl(network);
		console.log('url', `${baseUrl}/v3/apple-pay/process/partner`);
		console.log(JSON.stringify(data, null, 4));
		const wyreAuthToken = network.testnet || true ? WYRE_TOKEN_TEST : WYRE_TOKEN;
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${wyreAuthToken}`
		};
		console.log('about to process');
		const response = await wyreApi.post(`${baseUrl}/v3/apple-pay/process/partner`, data, headers);
		console.log({ response });
		const orderId = get(response, 'id', null);

		if (orderId) {
			return { orderId };
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
