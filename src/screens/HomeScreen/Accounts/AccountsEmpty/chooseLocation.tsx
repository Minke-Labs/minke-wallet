import React from 'react';
import { PayId, Interac, FasterPayments, Sepa } from './images';
import Pix from './Pix.svg';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'AU':
			return <PayId />;
		case 'GB':
			return <FasterPayments />;
		case 'CA':
			return <Interac />;
		case 'EU':
		case 'AT':
		case 'BE':
		case 'CY':
		case 'EE':
		case 'FI':
		case 'FR':
		case 'DE':
		case 'GR':
		case 'IE':
		case 'IT':
		case 'LV':
		case 'LT':
		case 'LU':
		case 'MT':
		case 'NE':
		case 'PT':
		case 'SK':
		case 'SI':
		case 'ES':
			return <Sepa />;
		case 'BR':
			return <Pix />;
		default:
			return null;
	}
};
