export interface ReferralCode {
	id: number;
	device_id: string;
	wallet: string;
	code: string;
}

export interface Referral {
	error?: string;
	id: number;
	device_id: string;
	wallet: string;
	referral_code: ReferralCode;
}
