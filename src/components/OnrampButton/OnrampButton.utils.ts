import {
	PayId,
	Interac,
	FasterPayments,
	Sepa,
	Pix,
	TurkeyBankTransfer
} from './images';

export const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'australia':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: PayId
			};
		case 'unitedKingdom':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: FasterPayments
			};
		case 'canada':
			return {
				locStyles: {
					backgroundColor: '#FFB92A',
					fontColor: '#0A2138'
				},
				image: Interac
			};
		case 'europeanUnion':
			return {
				locStyles: {
					backgroundColor: '#004899',
					fontColor: '#FFFFFF'
				},
				image: Sepa
			};
		case 'brazil':
			return {
				locStyles: {
					backgroundColor: '#FFFFFF',
					fontColor: '#0A2138'
				},
				image: Pix
			};
		case 'turkey':
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
