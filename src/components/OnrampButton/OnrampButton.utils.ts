import { PayId, Interac, FasterPayments, Sepa, Pix, TurkeyBankTransfer } from './images';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'AU':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: PayId
			};
		case 'GB':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: FasterPayments
			};
		case 'CA':
			return {
				locStyles: {
					backgroundColor: '#FFB92A',
					fontColor: '#0A2138'
				},
				image: Interac
			};
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
			return {
				locStyles: {
					backgroundColor: '#004899',
					fontColor: '#FFFFFF'
				},
				image: Sepa
			};
		case 'BR':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: Pix
			};
		case 'TR':
			return {
				locStyles: {
					backgroundColor: '#FCFBF9',
					fontColor: '#0A2138'
				},
				image: TurkeyBankTransfer
			};
		default:
			return null;
	}
};
