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

export interface RewardClaimParams {
	address: string;
	points: number;
	timestamp: number;
	signature: string;
}

export interface RewardClaim {
	error?: 'failed_claim' | 'invalid_request';
	transfer_id?: string;
}
