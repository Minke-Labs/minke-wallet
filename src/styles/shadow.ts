export type ShadowType = 0 | 1 | 2;

export const shadow = {
	0: null,
	1: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.12,
		shadowRadius: 12,
		elevation: 1
	},
	2: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.12,
		shadowRadius: 2
	}
};
