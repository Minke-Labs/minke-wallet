// export type SpacingType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// const spacing = [0, 4, 8, 16, 24, 32, 40, 48, 56, 64];

// 1 - xxxs
// 2 - xxs
// 3 - xs

// s - 4
// m - 5
// l - 6
// xl - 7
// xxl - 8
// xxxl - 9

export type SpacingType = keyof typeof spacing;
const spacing = {
	xxxs: 4,
	xxs: 8,
	xs: 16,
	s: 24,
	m: 32,
	l: 40,
	xl: 48,
	xxl: 56,
	xxxl: 64
};

export { spacing };
