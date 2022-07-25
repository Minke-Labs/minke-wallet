import { PayId, Interac, FasterPayments, Sepa, Pix, TurkeyBankTransfer } from './images';

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
		case 'austria':
		case 'belgium':
		case 'cyprus':
		case 'estonia':
		case 'finland':
		case 'france':
		case 'germany':
		case 'greece':
		case 'hungary':
		case 'ireland':
		case 'italy':
		case 'latvia':
		case 'lithuania':
		case 'luxembourg':
		case 'malta':
		case 'netherlands':
		case 'portugal':
		case 'slovakia':
		case 'slovenia':
		case 'spain':
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
