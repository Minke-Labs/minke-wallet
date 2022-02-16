const lightTheme = {
	alert1: '#C03030',
	alert2: '#F9E8E8',
	alert3: '#30C061',
	alert4: '#EEFAF1',
	alert5: '#1867FA',

	background1: '#F2EAE1',
	background2: '#FAF7F3',
	background3: '#F4F6F8',
	background4: '#FFFCF5',

	cta1: '#006AA6',
	cta2: '#D0D0D0',
	cta3: '#FCFBF9',

	detail1: '#B7B9BB',
	detail2: '#D0D0D0',
	detail3: '#F7F2ED',
	detail4: '#FFFFFF',
	detail5: '#CCDCFA',

	text1: '#0A2138',
	text2: '#213952',
	text3: '#4E5E6F',
	text4: '#748190',
	text5: '#B7B9BB',
	text6: '#FFFFFF',
	text7: '#006AA6',

	// Colors that aren't in tokens, but are used in the project.
	brand4: '#0A2036',
	alert3b: 'rgba(48, 192, 97, 0.15)',
	alert3c: 'rgba(48, 192, 97, 0)',
	text8: '#FFFFFF',
	text9: '#4E5E6F',
	graphic1: '#49d67855',
	graphic2: '#acffc83e',
	graphic3: '#ffffff4e'
};

const darkTheme = {
	alert1: '#E18A8A',
	alert2: '#45475C',
	alert3: '#ACE8B9',
	alert4: '#355260',
	alert5: '#6798F2',

	background1: '#0A2138',
	background2: '#22374C',
	background3: '#22374C',
	background4: '#22374C', // Missing color, I just repeated above's for now.

	cta1: '#006AA6',
	cta2: '#D0D0D0',
	cta3: '#FCFBF9',

	detail1: '#4E5E6F',
	detail2: '#4E5E6F',
	detail3: '#0A2036',
	detail4: '#213952',
	detail5: '#374C63',

	text1: '#FFFFFF',
	text2: '#B7B9BB',
	text3: '#B7B9BB',
	text4: '#748190',
	text5: '#D0D0D0',
	text6: '#FFFFFF',
	text7: '#FFFFFF',

	// Colors that aren't in tokens, but are used in the project.
	brand4: '#0A2036',
	alert3b: 'rgba(172, 232, 185, 0.15)',
	alert3c: 'rgba(172, 232, 185, 0)',
	text8: '#0A2138',
	text9: '#FFFFFF',
	graphic1: '#49d67855',
	graphic2: 'rgba(172, 232, 185, 0.15)',
	graphic3: 'rgba(172, 232, 185, 0)'
};

export const colors = { darkTheme, lightTheme };
export type ColorType = typeof darkTheme & typeof lightTheme;
