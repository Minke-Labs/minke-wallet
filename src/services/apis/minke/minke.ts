import axios from 'axios';
import { MINKE_API_KEY, MINKE_API_URL } from '@env';
import { getUniqueId } from 'react-native-device-info';
import Logger from '@utils/logger';
import { ReferralCode, Referral } from './minke.types';

console.log(MINKE_API_URL);

const instance = axios.create({
	baseURL: MINKE_API_URL || process.env.MINKE_API_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Token ${MINKE_API_KEY || process.env.MINKE_API_KEY}`
	}
});

const createReferralCode = async (wallet: string): Promise<ReferralCode> => {
	const { status, data } = await instance.post('/referral_codes', { wallet, device_id: getUniqueId() });
	if (status !== 200) Logger.sentry('Minke createReferralCode API failed');
	return data;
};

const createReferral = async (wallet: string, code: string): Promise<Referral> => {
	const { status, data } = await instance.post('/referrals', { code, wallet, device_id: getUniqueId() });
	if (status !== 200) Logger.sentry('Minke createReferral API failed');
	return data;
};

const getUsedReferralCode = async (wallet: string): Promise<ReferralCode> => {
	const { status, data } = await instance.get(`/referrals/${wallet}`);
	if (status !== 200) Logger.sentry('Minke getUsedReferralCode API failed');
	return data;
};

export { createReferralCode, createReferral, getUsedReferralCode };
