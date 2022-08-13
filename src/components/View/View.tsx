import React from 'react';
import { View as RNView } from 'react-native';
import { spacing, ViewType } from '@styles';
import { useTheme } from '@hooks';

const View: React.FC<Partial<ViewType>> = ({
	children,
	ph = 0,
	pv = 0,
	pl = 0,
	pr = 0,
	pt = 0,
	pb = 0,
	p = 0,
	mh = 0,
	mv = 0,
	ml = 0,
	mr = 0,
	mt = 0,
	mb = 0,
	m = 0,
	h = 0,
	w = 0,
	br = 0,
	bw = 0,
	round,
	bg = 'background1',
	fw = false,
	row = false,
	main,
	cross,
	style
}) => {
	const { colors } = useTheme();
	return (
		<RNView
			style={{
				...(!!ph && { paddingHorizontal: spacing[ph] }),
				...(!!pv && { paddingVertical: spacing[pv] }),
				...(!!pl && { paddingLeft: spacing[pl] }),
				...(!!pr && { paddingRight: spacing[pr] }),
				...(!!pt && { paddingTop: spacing[pt] }),
				...(!!pb && { paddingBottom: spacing[pb] }),
				...(!!p && { padding: spacing[p] }),
				...(!!mh && { marginHorizontal: spacing[mh] }),
				...(!!mv && { marginVertical: spacing[mv] }),
				...(!!ml && { marginLeft: spacing[ml] }),
				...(!!mr && { marginRight: spacing[mr] }),
				...(!!mt && { marginTop: spacing[mt] }),
				...(!!mb && { marginBottom: spacing[mb] }),
				...(!!m && { marginR: spacing[m] }),
				...(!!h && { height: h }),
				...(!!w && { width: w }),
				...(!!br && { borderRadius: spacing[br] }),
				...(!!bw && { borderWidth: bw }),
				...(!!round && { height: round, width: round, borderRadius: round / 2 }),
				...(!!bg && { backgroundColor: colors[bg] }),
				...(!!fw && { width: '100%' }),
				...(!!row && { flexDirection: 'row' }),
				...(!!main && { justifyContent: main }),
				...(!!cross && { alignItems: cross }),
				...(style as object)
			}}
		>
			{children}
		</RNView>
	);
};

export default View;
