export type FontWeightType = keyof typeof fontWeight;
const fontWeight = {
	regular: 'Inter_400Regular',
	medium: 'Inter_500Medium',
	semiBold: 'Inter_600SemiBold',
	bold: 'Inter_700Bold',
	extraBold: 'Inter_800ExtraBold'
};

export type FontTypeType = keyof typeof fontType;
const fontType = {
	textLarge: {
		fontSize: 48,
		lineHeight: 56
	},
	h1: {
		fontSize: 36,
		lineHeight: 44
	},
	h2: {
		fontSize: 30,
		lineHeight: 36
	},
	h3: {
		fontSize: 24,
		lineHeight: 29
	},
	p: {
		fontSize: 18,
		lineHeight: 22
	},
	p2: {
		fontSize: 16,
		lineHeight: 19
	},
	a: {
		fontSize: 14,
		lineHeight: 17
	},
	span: {
		fontSize: 12,
		lineHeight: 16
	},

	// NEW SIZES

	// Display
	dLarge: {
		fontSize: 48,
		lineHeight: 57.6
	},
	dMedium: {
		fontSize: 32,
		lineHeight: 44.8
	},
	dSmall: {
		fontSize: 24,
		lineHeight: 33.6 // Not sure yet. Change when the design is ready.
	},
	// Headline
	hLarge: {
		fontSize: 32,
		lineHeight: 44.8
	},
	hMedium: {
		fontSize: 24,
		lineHeight: 33.6
	},
	hSmall: {
		fontSize: 20,
		lineHeight: 28
	},
	// Title
	tMedium: {
		fontSize: 18,
		lineHeight: 21.78
	},
	tSmall: {
		fontSize: 16,
		lineHeight: 22.4
	},
	// Label
	lLarge: {
		fontSize: 16,
		lineHeight: 22.4
	},
	lMedium: {
		fontSize: 14,
		lineHeight: 19.6
	},
	lSmall: {
		fontSize: 12,
		lineHeight: 16.8
	},
	// Body
	bMedium: {
		fontSize: 16,
		lineHeight: 22.4
	},
	bSmall: {
		fontSize: 14,
		lineHeight: 19.6
	},
	bDetail: {
		fontSize: 12,
		lineHeight: 16.8
	}
};

export { fontWeight, fontType };
