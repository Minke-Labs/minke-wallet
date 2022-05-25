import { PayId, Interac, FasterPayments, Sepa, Pix } from './images';

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
		case 'UK':
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
		default:
			return null;
	}
};
